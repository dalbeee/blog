import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { NotionPost } from '@blog/core/dist/notion/useCase/types';

import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { User } from '@src/user/entity/user.entity';
import { NotionService } from './notion.service';

@Controller('/notion')
export class NotionController {
  constructor(
    private readonly notionService: NotionService,
    @InjectQueue('notion') private getNotionPost: Queue,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/crawler')
  async crawler(@CurrentUser() user: User) {
    const notYetSavedPosts =
      await this.notionService.findPostsNotYetSavedLocal();

    const notYetUpdatedPosts =
      await this.notionService.findPostsWithOutOfSyncByUpdatedAtField();

    console.log(
      'notYetSave : ',
      notYetSavedPosts.length,
      'notYetSync : ',
      notYetUpdatedPosts.length,
    );
    // return;
    const queue = notYetSavedPosts.concat(notYetUpdatedPosts);

    this.getNotionPost.add('getNotionPost', {
      user,
      queuePosts: queue,
    });
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  async getPosts(): Promise<NotionPost[]> {
    return await this.notionService.findPostsFromServer();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:postId')
  async getPost(@Param('postId') postId: string) {
    return await this.notionService.findPostFromServerToString(postId);
  }
}

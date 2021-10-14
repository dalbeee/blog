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
  ) // @InjectQueue('notion') private getNotionPost: Queue,
  {}

  @UseGuards(JwtAuthGuard)
  @Get('/crawler')
  async crawler(@CurrentUser() user: User) {
    const notionResponseDatabase = await this.notionService.getPosts();

    const notionDB = notionResponseDatabase.slice(0, 5);

    // this.getNotionPost.add('getNotionPost', { user, notionDB });
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  async getPosts(): Promise<NotionPost[]> {
    return await this.notionService.getPosts();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:postId')
  async getPost(@Param('postId') postId: string) {
    return await this.notionService.getPostToString(postId);
  }
}

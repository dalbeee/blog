import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { User } from '@src/user/entity/user.entity';
import { NotionCrawler } from './notion.crawler';
import { NotionService } from './notion.service';

@Controller('/notion')
@UseInterceptors(CacheInterceptor)
export class NotionController {
  constructor(
    private readonly notionService: NotionService,
    private readonly notionCrawler: NotionCrawler,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/crawler')
  async crawler(@CurrentUser() user: User) {
    return await this.notionCrawler.getDBService(user);
  }

  @Get('/:postId')
  async getPost(@Param('postId') postId: string) {
    return await this.notionService.getPost(postId);
  }

  @Get()
  async getPosts() {
    return await this.notionService.getPosts();
  }
}

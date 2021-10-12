import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller('/notion')
@UseInterceptors(CacheInterceptor)
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get('/:postId')
  async getPost(@Param('postId') postId: string) {
    return await this.notionService.getPost(postId);
  }

  @Get()
  async getPosts() {
    return await this.notionService.getPosts(process.env.NOTION_DATABASE_ID);
  }
}

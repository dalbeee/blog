import { Controller, Get, Param } from '@nestjs/common';

import { NotionCronService } from './notion.cron.service';
import { NotionService } from './notion.service';

@Controller('/notion')
export class NotionController {
  constructor(
    private readonly notionCronService: NotionCronService,
    private readonly notionService: NotionService,
  ) {}

  @Get('/:id')
  async findPostById(@Param('id') id: string) {
    return this.notionService.findPostById(id);
  }

  @Get()
  async findPosts() {
    return this.notionService.findPosts();
  }

  @Get('/sync/status')
  async getSyncStatus() {
    return this.notionCronService.getCronActivate();
  }

  @Get('/sync/trigger')
  async crawler() {
    this.notionCronService.addNotionCron();
    return true;
  }
}

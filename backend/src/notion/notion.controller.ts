import { Controller, Get } from '@nestjs/common';

import { NotionCronService } from './notion.cron.service';

@Controller('/notion')
export class NotionController {
  constructor(private readonly notionCronService: NotionCronService) {}

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

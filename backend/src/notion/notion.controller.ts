import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { NotionService } from './notion.service';
import { RolesGuard } from '@src/auth/guard/role.guard';
import { NotionCronService } from './notion.cron.service';

@Controller('/notion')
export class NotionController {
  constructor(
    private readonly notionService: NotionService,
    private readonly notionCronService: NotionCronService,
  ) {}

  @Get('/sync/status')
  async getSyncStatus() {
    return this.notionCronService.getCronActivate();
  }

  @Get('/sync/trigger')
  async crawler() {
    this.notionCronService.addNotionCron();
    return true;
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/initVariables')
  async initVariables() {
    return await this.notionService.initVariables();
  }
}

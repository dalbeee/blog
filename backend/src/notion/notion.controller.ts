import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { NotionService } from './notion.service';
import { Role, Roles } from '@src/auth/decorator/role';
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

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
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

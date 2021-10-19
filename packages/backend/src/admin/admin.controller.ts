import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
} from '@nestjs/common';

import { ConfigDTO } from '@blog/core/dist/domain';

import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('/config')
  async setKeyValue(
    @Body(new ParseArrayPipe({ items: ConfigDTO })) body: ConfigDTO[],
  ) {
    const result = await Promise.all(
      body.map(
        async (configItem) => await this.adminService.setKeyValue(configItem),
      ),
    );
    return result;
  }

  @Get('/config/:key')
  async getKeyValue(@Param('key') key: string) {
    return await this.adminService.getKeyValue(key);
  }

  async deleteKeyValue() {}
}

import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseArrayPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Role, Roles } from '@src/auth/decorator/role';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@src/auth/guard/role.guard';

import { AdminService } from './admin.service';
import { ConfigDTO } from './dto/config.dto';

@Controller('/admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @Patch('/config')
  async setConfig(
    @Body(new ParseArrayPipe({ items: ConfigDTO })) body: ConfigDTO[],
  ) {
    const result = await Promise.all(
      body.map(
        async (configItem) => await this.adminService.setKeyValue(configItem),
      ),
    );
    return result;
  }

  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @Get('/config/:key')
  async getConfig(@Param('key') key: string) {
    try {
      return await this.adminService.getKeyValue(key);
    } catch (error) {
      this.logger.log(error);
    }
  }

  async deleteKeyValue() {}
}

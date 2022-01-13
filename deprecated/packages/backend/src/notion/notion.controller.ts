import { Controller, ForbiddenException, Get, UseGuards } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { User } from '@src/user/entity/user.entity';
import { NotionService } from './notion.service';
import { Role, Roles } from '@src/auth/decorator/role';
import { RolesGuard } from '@src/auth/guard/role.guard';

@Controller('/notion')
export class NotionController {
  constructor(
    private readonly notionService: NotionService,
    @InjectQueue('notionSync') private notionSync: Queue,
  ) {}

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('/sync')
  async crawler(@CurrentUser() user: User) {
    try {
      const notYetSavedPosts =
        await this.notionService.findPostsNotYetSavedLocal();

      const notYetUpdatedPosts =
        await this.notionService.findPostsWithOutOfSyncByUpdatedAtField();

      console.log(
        'new : ',
        notYetSavedPosts.length,
        'notYetSync : ',
        notYetUpdatedPosts.length,
      );

      const queue = notYetSavedPosts.concat(notYetUpdatedPosts);

      this.notionSync.add('syncNotionPosts', {
        user,
        queuePosts: queue,
      });
      return true;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/initVariables')
  async initVariables() {
    return await this.notionService.initVariables();
  }
}

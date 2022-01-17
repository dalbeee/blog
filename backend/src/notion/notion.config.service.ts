import { CacheTTL, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { AdminService } from '@src/admin/admin.service';
import { Axios } from '@src/share/http-client/axios';
import { UserService } from '@src/user/user.service';
import { NotionUseCase } from './notion.usecase';

@Injectable()
@CacheTTL(60)
export class NotionConfigService {
  notionAPI: NotionUseCase;
  httpClient: Axios;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  async notionDatabaseId() {
    return (await this.adminService.getKeyValue('NOTION_DATABASE_ID'))?.value;
  }

  async notionApiKey() {
    return (await this.adminService.getKeyValue('NOTION_API_KEY'))?.value;
  }

  async notionUser() {
    const email = (await this.adminService.getKeyValue('ADMIN_USER_EMAIL'))
      ?.value;
    if (email) {
      return await this.userService.findByEmail(email);
    }

    return null;
  }
}

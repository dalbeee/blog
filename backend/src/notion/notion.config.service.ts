import { CacheTTL, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { ConfigService } from '@src/config/config.service';

@Injectable()
@CacheTTL(60)
export class NotionConfigService {
  repository: { [key: string]: string };

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.repository = {};
  }

  async isValidConfiguration() {
    const keys = [
      'NEST_NOTION_API_KEY',
      'NEST_NOTION_DATABASE_ID',
      'NEST_ADMIN_USER_EMAIL',
    ];
    const values = await Promise.all(
      keys.map((key) => this.configService.getKeyValue(key)),
    );

    const result = values.map((value, index) => {
      return value === undefined && keys[index];
    });

    if (result.some((item) => !!item)) throw Error(`key not found : ${result}`);
    return true;
  }

  async getNotionConfigByKey(key: string) {
    return this.configService.getKeyValue(key);
  }
}

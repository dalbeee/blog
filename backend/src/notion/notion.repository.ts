import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

import { DatabaseQueryResult } from './domain/types/database-query-result';
import { NotionBlock } from './domain/types/notion-block';
import { NotionConfigService } from './notion.config.service';

@Injectable()
export class NotionRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly notionConfigService: NotionConfigService,
  ) {}

  async getPost(url: string): Promise<NotionBlock> {
    const res = await this.httpService
      .get(`/blocks/${url}/children`)
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }

  async getPosts(): Promise<DatabaseQueryResult> {
    const databaseId = await this.notionConfigService.getNotionConfigByKey(
      'NOTION_DATABASE_ID',
    );

    const res = await this.httpService
      .post(`/databases/${databaseId}/query`, {})
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }
}

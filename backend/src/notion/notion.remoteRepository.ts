import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { parseISO } from 'date-fns';

import { DatabaseQueryResult } from './domain/types/database-query-result';
import { NotionBlock } from './domain/types/notion-block';
import { NotionPost } from './domain/types/notion-post';

@Injectable()
export class NotionRemoteRepository {
  constructor(private readonly httpService: HttpService) {}

  async getRawfindPostData(url: string): Promise<NotionBlock> {
    const res = await this.httpService
      .get(`/blocks/${url}/children`)
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }

  async getRawfindPostsData(): Promise<DatabaseQueryResult> {
    const databaseId = process.env.NEST_NOTION_DATABASE_ID;
    const res = await this.httpService
      .post(`/databases/${databaseId}/query`, {})
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }

  async findPosts(): Promise<NotionPost[]> {
    const result = await this.getRawfindPostsData();
    const parseQueryResult = (query: DatabaseQueryResult): NotionPost[] => {
      const distributedPosts = query.results.filter((item) => {
        return item.properties?.publishToBlog?.select?.name === '배포';
      });
      return distributedPosts.map((result) => ({
        id: result.id,
        title: result?.properties?.['이름']?.title?.[0]?.plain_text!,
        author: process.env.NEST_NOTION_AUTHOR_NAME as string,
        url: result.url,
        createdAt: parseISO(result.created_time),
        updatedAt: parseISO(result.last_edited_time),
      }));
    };
    return parseQueryResult(result);
  }
}

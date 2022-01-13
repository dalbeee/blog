import { Axios } from '@src/share/http-client/axios';
import { DatabaseQueryResult } from './domain/types/database-query-result';
import { NotionBlock } from './domain/types/notion-block';

export class NotionRepository {
  constructor(private readonly httpClient: Axios) {}

  async getPost(url: string): Promise<NotionBlock> {
    return await this.httpClient.get(`/blocks/${url}/children`);
  }

  async getPosts(databaseId: string): Promise<DatabaseQueryResult> {
    return await this.httpClient.post(`/databases/${databaseId}/query`, {});
  }
}

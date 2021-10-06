import { HttpClient } from "../../infrastructure/http/httpClient";
import { DatabaseQueryResult, NotionBlock } from "../useCase/types";

export class NotionRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getPost(url: string): Promise<NotionBlock> {
    return await this.httpClient.get(`/blocks/${url}/children`);
  }

  async getPosts(
    databaseId: string
  ): Promise<{ results: DatabaseQueryResult[] }> {
    return await this.httpClient.post(`/databases/${databaseId}/query`, {});
  }
}

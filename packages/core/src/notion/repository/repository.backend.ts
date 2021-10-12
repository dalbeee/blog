import { HttpClient } from "../../infrastructure/http/httpClient";
import { NotionRepository } from "./repository.interface";
import { DatabaseQueryResult, NotionBlock } from "./types";

export class BackendRepository implements NotionRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getPost(url: string): Promise<NotionBlock> {
    return await this.httpClient.get(`/blocks/${url}/children`);
  }

  async getPosts(databaseId: string): Promise<DatabaseQueryResult> {
    return await this.httpClient.post(`/databases/${databaseId}/query`, {});
  }
}

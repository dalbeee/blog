import { HttpClient } from "../http";

export class NotionRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async sync() {
    return await this.httpClient.get(`/notion/sync`);
  }

  async initVariables() {
    return await this.httpClient.get(`/notion/initVariables`);
  }
}

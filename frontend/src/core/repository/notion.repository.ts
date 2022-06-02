import { HttpClientInterface } from "../httpClient/httpClientInterface";

export class NotionRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async sync() {
    return await this.httpClient.get(`/notion/sync/trigger`);
  }

  async desync() {
    return await this.httpClient.get(`/notion/sync/desync`);
  }

  async initVariables() {
    return await this.httpClient.get(`/notion/initVariables`);
  }

  async activeState() {
    return await this.httpClient.get(`/notion/sync/status`);
  }
}

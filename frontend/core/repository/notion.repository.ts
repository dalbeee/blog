import { HttpClientInterface } from "../httpClient/httpClientInterface";

export class NotionRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async sync() {
    return await this.httpClient.get(`/notion/sync`);
  }

  async initVariables() {
    return await this.httpClient.get(`/notion/initVariables`);
  }
}

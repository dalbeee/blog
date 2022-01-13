import { HttpClientInterface } from "../httpClient/httpClientInterface";

export interface ConfigDTO {
  key: string;
  value: string;
}

export class ConfigRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async setKeyValue(data: ConfigDTO[]) {
    return await this.httpClient.patch(`/admin/config`, data);
  }

  async getKeyValue(key: string) {
    return await this.httpClient.get(`/admin/config/${key}`);
  }
}

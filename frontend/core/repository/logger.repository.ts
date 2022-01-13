import { Logger } from "../domain";
import { HttpClientInterface } from "../httpClient/httpClientInterface";

export class LoggerRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async save(data: Logger) {
    return await this.httpClient.post(`/logger`, data);
  }
}

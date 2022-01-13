import { Logger } from "../../domain/logger/logger.entity";
import { HttpClient } from "../http";

export class LoggerRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async save(data: Logger) {
    return await this.httpClient.post(`/logger`, data);
  }
}

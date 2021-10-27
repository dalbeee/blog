import { Logger } from "../../domain";
import { HttpClient } from "../http";

export class LoggerRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async save(data: Logger) {
    return await this.httpClient.post(`/logger`, data);
  }
}

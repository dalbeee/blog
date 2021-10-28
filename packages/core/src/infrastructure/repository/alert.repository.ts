import { HttpClient } from "../http";

export class AlertRepository {
  SLACK_WEBHOOK_API_KEY: string;

  constructor(private readonly httpClient: HttpClient) {
    this.SLACK_WEBHOOK_API_KEY = process.env.SLACK_WEBHOOK_API_KEY;
  }

  async publishToSlack(data: any) {
    const body = { text: data };
    return await this.httpClient.post(this.SLACK_WEBHOOK_API_KEY, body);
  }
}
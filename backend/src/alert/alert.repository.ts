import { Axios } from '@src/share/http-client/axios';
import { getEnv } from '@src/share/utils/getEnv';

export class AlertRepository {
  SLACK_WEBHOOK_API_KEY: string;

  constructor(private readonly httpClient: Axios) {
    this.SLACK_WEBHOOK_API_KEY = getEnv('SLACK_WEBHOOK');
  }

  async publishToSlack(data: any) {
    const body = { text: data };
    return await this.httpClient.post(this.SLACK_WEBHOOK_API_KEY, body);
  }
}

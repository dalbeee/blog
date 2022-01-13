import { Injectable } from '@nestjs/common';
import { AlertRepository } from './alert.repository';

@Injectable()
export class AlertService {
  constructor(private readonly alertRepository: AlertRepository) {
    // const httpClient = new Axios(process.env.SLACK_WEBHOOK_API_KEY);
    // const alertRepository = new AlertRepository(httpClient);
  }

  async publishToSlack(message: string) {
    return await this.alertRepository.publishToSlack(message);
  }
}

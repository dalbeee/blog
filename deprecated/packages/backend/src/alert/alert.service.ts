import { Injectable } from '@nestjs/common';

import { Axios } from '@blog/core/dist/infrastructure/http';
import { AlertUseCase } from '@blog/core/dist/useCase';
import { AlertRepository } from '@blog/core/dist/infrastructure/repository';

@Injectable()
export class AlertService {
  service: AlertUseCase;
  constructor() {
    const httpClient = new Axios(process.env.SLACK_WEBHOOK_API_KEY);
    const alertRepository = new AlertRepository(httpClient);
    const alertService = new AlertUseCase(alertRepository);
    this.service = alertService;
  }

  async publishToSlack(message: string) {
    return await this.service.publishToSlack(message);
  }
}

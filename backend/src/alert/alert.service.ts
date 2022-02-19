import { Injectable } from '@nestjs/common';
import { AlertRepository } from './alert.repository';

@Injectable()
export class AlertService {
  constructor(private readonly alertRepository: AlertRepository) {}

  async publishToSlack(message: string) {
    return await this.alertRepository.publishToSlack(message);
  }
}

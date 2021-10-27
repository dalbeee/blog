import { AlertRepository } from "../infrastructure/repository/alert.repository";

export class AlertUseCase {
  constructor(private readonly alertRepository: AlertRepository) {}

  async publishToSlack<T>(message: T) {
    return await this.alertRepository.publishToSlack(message);
  }
}

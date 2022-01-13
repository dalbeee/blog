import { Body, Controller, Post } from '@nestjs/common';

import { AlertService } from './alert.service';

@Controller('/alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async publishToSlack(@Body('message') message: string) {
    const bodyString = `timeStamp : ${Date.now()}\nmessage : ${message}`;
    return await this.alertService.publishToSlack(bodyString);
  }
}

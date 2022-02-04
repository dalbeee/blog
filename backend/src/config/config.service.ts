import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getKeyValue(key: string) {
    return process.env[key];
  }
}

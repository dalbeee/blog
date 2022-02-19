import { Injectable } from '@nestjs/common';
import { getEnv } from '@src/share/utils/getEnv';

@Injectable()
export class ConfigService {
  getKeyValue(key: string) {
    const env = getEnv(key);

    return env;
  }
}

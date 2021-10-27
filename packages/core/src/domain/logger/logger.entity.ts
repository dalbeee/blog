import { BaseEntity } from "../base.entity";
import { LoggerType } from "./logger.dto";

export class Logger extends BaseEntity {
  message: string;
  type: LoggerType;
  from: string;
}

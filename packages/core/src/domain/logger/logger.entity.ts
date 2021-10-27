import { IsNotEmpty } from "class-validator";
import { BaseEntity } from "../base.entity";

enum Type {
  Info,
  Warn,
  Error,
}

export class Logger extends BaseEntity {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  type: Type;
}

import { IsEnum, IsNotEmpty } from "class-validator";

export enum LoggerType {
  error = "error",
  warn = "warn",
  info = "info",
}

export class LoggerDTO {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  @IsEnum(LoggerType)
  type: LoggerType;

  @IsNotEmpty()
  from: string;
}

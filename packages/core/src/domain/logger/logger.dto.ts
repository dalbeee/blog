import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Type {
  Info,
  Warn,
  Error,
}

export class LoggerDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;
}

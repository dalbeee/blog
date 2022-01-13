import { IsNotEmpty, IsString } from 'class-validator';

export class ConfigDTO {
  @IsString()
  key: string;

  @IsNotEmpty()
  value: any;
}

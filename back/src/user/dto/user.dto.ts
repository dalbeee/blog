import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UserRO extends PartialType(UserDTO) {}

import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsString, Max, Min } from 'class-validator';

export class UserDTO {
  @IsString()
  @Min(6)
  @Max(20)
  email: string;

  @IsString()
  @Min(4)
  @Max(20)
  username: string;

  @IsString()
  @Min(6)
  @Max(20)
  password: string;
}

export class UserRO extends PartialType(UserDTO) {}

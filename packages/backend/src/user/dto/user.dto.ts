import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class UserDTO {
  @IsEmail()
  @Length(6, 30)
  email: string;

  @IsString()
  @Length(4, 20)
  @Matches(/^\S*$/, { message: 'space not allow' })
  username: string;

  @IsString()
  @Length(6, 20)
  @Matches(/^\S*$/, { message: 'space not allow' })
  password: string;
}

export class UpdateUserDTO extends PartialType(UserDTO) {}

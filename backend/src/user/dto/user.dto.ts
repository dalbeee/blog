import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role } from './user-roles';

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

  @IsArray()
  @IsOptional()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}

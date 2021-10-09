import { IsEmail, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsEmail()
  @Length(6, 30)
  email: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;
}

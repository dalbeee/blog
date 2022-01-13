import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  @Length(6, 30)
  @IsOptional()
  email?: string;

  @IsString()
  @Length(4, 20)
  @Matches(/^\S*$/, { message: 'space not allow' })
  @IsOptional()
  username?: string;

  @IsString()
  @Length(6, 20)
  @Matches(/^\S*$/, { message: 'space not allow' })
  @IsOptional()
  password?: string;
}

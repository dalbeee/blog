import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

export enum Role {
  User = "user",
  Admin = "admin",
}

export class UserDTO {
  @IsEmail()
  @Length(6, 30)
  email: string;

  @IsString()
  @Length(4, 20)
  @Matches(/^\S*$/, { message: "space not allow" })
  username: string;

  @IsString()
  @Length(6, 20)
  @Matches(/^\S*$/, { message: "space not allow" })
  password: string;

  @IsArray()
  @IsOptional()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}

export class UpdateUserDTO {
  @IsEmail()
  @Length(6, 30)
  @IsOptional()
  email?: string;

  @IsString()
  @Length(4, 20)
  @Matches(/^\S*$/, { message: "space not allow" })
  @IsOptional()
  username?: string;

  @IsString()
  @Length(6, 20)
  @Matches(/^\S*$/, { message: "space not allow" })
  @IsOptional()
  password?: string;
}

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
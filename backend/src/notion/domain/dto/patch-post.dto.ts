// import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchPostDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  notionId?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  createdAt?: string;

  @IsOptional()
  updatedAt?: string;
}

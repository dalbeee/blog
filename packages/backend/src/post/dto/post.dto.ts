import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  title: string;

  @IsString()
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

export class PatchPostDTO extends PartialType(CreatePostDTO) {}

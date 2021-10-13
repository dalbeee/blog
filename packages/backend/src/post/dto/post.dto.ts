import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class PostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  createdAt?: string;

  @IsOptional()
  updatedAt?: string;
}

export class CreatePostDTO extends PartialType(PostDTO) {}

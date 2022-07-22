import { IsOptional, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsString()
  author!: string;

  @IsString()
  @IsOptional()
  notionId?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;
}

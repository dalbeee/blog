import { IsOptional, IsString } from 'class-validator';

export class PostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  slug?: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}

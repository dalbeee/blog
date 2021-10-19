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

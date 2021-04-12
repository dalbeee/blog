import { IsString } from 'class-validator';

export class PostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

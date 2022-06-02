import { BaseEntity } from "../common/types";

export class Post extends BaseEntity {
  title: string;
  content: string;
  description: string;
  thumbnail: string;
  slug: string;
  notionId?: string;
}

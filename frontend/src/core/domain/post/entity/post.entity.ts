import { User } from "../..";
import { BaseEntity } from "../../base.entity";

export class Post extends BaseEntity {
  title: string;
  content: string;
  description: string;
  thumbnail: string;
  slug: string;
  notionId?: string;
  user: User;
}

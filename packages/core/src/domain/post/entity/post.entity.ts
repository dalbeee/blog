import { User } from "../..";

export class Post {
  title: string;

  content: string;

  description: string;

  thumbnail: string;

  slug: string;

  notionId?: string;

  user: User;
}

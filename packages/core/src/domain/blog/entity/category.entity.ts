import { Post } from "./post.entity";

export class Category {
  id: string;
  name: string;
  posts: Post[];
}

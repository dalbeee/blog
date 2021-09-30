import { Post } from "./post.entity";

export class Tag {
  id: string;
  name: string;
  posts: Post[];
}

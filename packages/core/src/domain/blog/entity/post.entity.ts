import { Category } from "./category.entity";
import { Tag } from "./tag.entity";

export class Post {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail: string;
  slug: string;
  category: Category;
  tags: Tag[];
  comments: Comment[];

  createdAt: string;
  updatedAt: string;
}

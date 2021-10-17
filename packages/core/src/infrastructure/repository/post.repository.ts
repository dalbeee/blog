import { Post } from "../../domain/blog/entity/post.entity";
import { HttpClient } from "../http";

export class PostRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getPost(url: string): Promise<Post> {
    return await this.httpClient.get(`/posts/${url}`);
  }

  async getPosts(): Promise<Post[]> {
    return await this.httpClient.get(`/posts`);
  }
}

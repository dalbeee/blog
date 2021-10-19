import { Post } from "../../domain/blog/entity/post.entity";
import { HttpClient } from "../http";

export class PostRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getPost(postId: string): Promise<Post> {
    return await this.httpClient.get(`/posts/${postId}`);
  }

  async getPosts(): Promise<Post[]> {
    return await this.httpClient.get(`/posts`);
  }

  async createPost(post: PostDTO): Promise<Post> {
    return await this.httpClient.post(`/post`, post);
  }

  async deletePost(postId: string): Promise<any> {
    return await this.httpClient.delete(`/posts/${postId}`);
  }
}

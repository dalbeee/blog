import { CreatePostDTO, Post } from "../domain";
import { HttpClientInterface } from "../httpClient/httpClientInterface";

export class PostRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async getPost(postId: string): Promise<Post> {
    return await this.httpClient.get(`/posts/${postId}`);
  }

  async getPosts(): Promise<Post[]> {
    return await this.httpClient.get(`/posts`);
  }

  async createPost(post: CreatePostDTO): Promise<Post> {
    return await this.httpClient.post(`/posts`, post);
  }

  async deletePost(postId: string): Promise<any> {
    return await this.httpClient.delete(`/posts/${postId}`);
  }
}

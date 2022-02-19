import { CreatePostDTO, Post } from "../domain";
import { HttpClientInterface } from "../httpClient/httpClientInterface";

export class PostRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async getPost(postId: string): Promise<Post> {
    return await this.httpClient.get(`/notion/${postId}`);
  }

  async getPosts(): Promise<Post[]> {
    return await this.httpClient.get(`/notion`);
  }

  async createPost(post: CreatePostDTO): Promise<Post> {
    return await this.httpClient.post(`/notion`, post);
  }

  async deletePost(postId: string): Promise<any> {
    return await this.httpClient.delete(`/notion/${postId}`);
  }
}

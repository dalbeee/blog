import { CreatePostDTO, Post } from "../domain";
import { HttpClientInterface } from "../httpClient/httpClientInterface";

export class PostRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async getPost(postId: string): Promise<Post> {
    return await this.httpClient.get(`/posts/${postId}`);
  }

  async getPosts(): Promise<Post[]> {
    const result = await this.httpClient.get(`/posts`);
    console.log(result);
    return result;
  }

  async createPost(post: CreatePostDTO): Promise<Post> {
    return await this.httpClient.post(`/posts`, post);
  }

  async deletePost(postId: string): Promise<any> {
    return await this.httpClient.delete(`/posts/${postId}`);
  }
}

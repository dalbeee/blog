import { CreatePostDTO } from "../domain";
import { PostRepository } from "../repository";
import { ValidationService } from "./validationService";

export class PostService {
  validationService: ValidationService;
  constructor(private readonly postRepository: PostRepository) {
    this.validationService = new ValidationService();
  }

  async getPost(postId: string) {
    return await this.postRepository.getPost(postId);
  }

  async getPosts() {
    return await this.postRepository.getPosts();
  }

  async createPost(post: CreatePostDTO) {
    let postDTO: CreatePostDTO;

    try {
      postDTO = await this.validationService.validate(
        new CreatePostDTO(),
        post
      );
    } catch (error) {
      throw error;
    }

    try {
      const result = await this.postRepository.createPost(postDTO);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: string) {
    const result = await this.postRepository.deletePost(postId);

    return result;
  }
}
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
}

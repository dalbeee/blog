import { getHttpClient } from "./httpClient/httpClient";
import { AuthService } from "./service/authService";
import { PostService } from "./service/postService";
import { UserService } from "./service/userService";
import { ToastService } from "./service/toastService";
import { PostRepository, UserRepository } from "./repository";

export const coreAPI = () => {
  const httpClient = getHttpClient();

  const authService = new AuthService();

  const postRepository = new PostRepository(httpClient);
  const postService = new PostService(postRepository);

  const userRepository = new UserRepository(httpClient);
  const userService = new UserService(userRepository);

  const toastService = new ToastService();

  return {
    post: postService,
    user: userService,
    auth: authService,
    toast: toastService,
  };
};

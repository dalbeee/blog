import { getHttpClient } from "./httpClient/httpClient";
import { AuthService } from "./service/authService";
import { ConfigService } from "./service/configService";
import { PostService } from "./service/postService";
import { UserService } from "./service/userService";
import { NotionService } from "./service/notionService";
import { ToastService } from "./service/toastService";
import {
  ConfigRepository,
  NotionRepository,
  PostRepository,
  UserRepository,
} from "./repository";

export const coreAPI = () => {
  const httpClient = getHttpClient();

  const authService = new AuthService();

  const postRepository = new PostRepository(httpClient);
  const postService = new PostService(postRepository);

  const userRepository = new UserRepository(httpClient);
  const userService = new UserService(userRepository);

  const configRepository = new ConfigRepository(httpClient);
  const configService = new ConfigService(configRepository);

  const notionRepository = new NotionRepository(httpClient);
  const notionService = new NotionService(configService, notionRepository);

  const toastService = new ToastService();

  return {
    post: postService,
    user: userService,
    auth: authService,
    config: configService,
    notion: notionService,
    toast: toastService,
  };
};

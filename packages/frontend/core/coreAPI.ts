import { infrastructure } from "@blog/core";

import { getHttpClient } from "./httpClient/httpClient";
import { UserRepository } from "./repository/UserRepository";
import { AuthService } from "./service/authService";
import { ConfigService } from "./service/configService";
import { PostService } from "./service/postService";
import { UserService } from "./service/userService";
import { NotionService } from "./service/notionService";

export const coreAPI = () => {
  const httpClient = getHttpClient();

  const authService = new AuthService();

  const postRepository = new infrastructure.repository.PostRepository(
    httpClient
  );
  const postService = new PostService(postRepository);

  const userRepository = new UserRepository(httpClient);
  const userService = new UserService(userRepository);

  const configRepository = new infrastructure.repository.ConfigRepository(
    httpClient
  );
  const configService = new ConfigService(configRepository);

  const notionRepository = new infrastructure.repository.NotionRepository(
    httpClient
  );
  const notionService = new NotionService(configService, notionRepository);

  return {
    post: postService,
    user: userService,
    auth: authService,
    config: configService,
    notion: notionService,
  };
};

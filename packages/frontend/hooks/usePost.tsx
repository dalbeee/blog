import { infrastructure } from "@blog/core";
import { getHttpClient } from "../core/httpClient";
import { postService } from "../core/service/postService";

export const usePost = () => {
  const httpClient = getHttpClient();

  const postRepository = new infrastructure.repository.PostRepository(
    httpClient
  );

  const service = postService(postRepository);

  return service;
};

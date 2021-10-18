import { infrastructure } from "@blog/core";
import { getHttpClient } from "../core/httpClient";

const usePost = () => {
  const httpClient = getHttpClient();

  const repository = new infrastructure.repository.PostRepository(httpClient);

  return repository;
};

export default usePost;

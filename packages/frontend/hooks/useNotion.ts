import { infrastructure } from "@blog/core";
import { getHttpClient } from "../core/httpClient";

export const useNotion = () => {
  const httpClient = getHttpClient();
  const notionRepository = new infrastructure.repository.NotionRepository(
    httpClient
  );

  return notionRepository;
};

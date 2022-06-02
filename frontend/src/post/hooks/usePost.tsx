import { getHttpClient } from "../../common/httpClient/httpClient";

const httpClient = getHttpClient();

export const getPost = async (postId: string) =>
  await httpClient.get(`/notion/${postId}`);

export const getPosts = async () => await httpClient.get(`/notion`);

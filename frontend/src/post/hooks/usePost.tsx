import { getHttpClient } from "../../common/httpClient/httpClient";
import { Post } from "../types";

const httpClient = getHttpClient();

export const getPost = async (postId: string): Promise<Post> =>
  await httpClient.get(`/notion/${postId}`);

export const getPosts = async (): Promise<Post[]> =>
  await httpClient.get(`/notion`).catch(() => []);

import axios, { Method } from "axios";
import _ from "lodash";
import {
  CommentDTO,
  UserLoginDTO,
  PostDTO,
  IUserLoginResultSuccess,
  IUserLoginResultError,
  IPost,
} from "..";
import { getToken } from "./auth";
import { logger } from "./logger";

interface CustomAxiosResult<L = any, R = any> {
  data?: R;
  errorData?: L;
  isError?: boolean;
}

// "Content-Type": "application/json",
const defaults = {
  uri: (() => {
    if (process.env.IS_BUILD) return process.env.API_FROM_INTERNET;
    return typeof window === "undefined" ? process.env.NEXT_PUBLIC_API : "/api";
  })(),
  headers: () => ({
    Authorization: getToken() ? `Bearer ${getToken()}` : "",
  }),
};

const getAxiosData = async <L extends {} = any, R extends {} = any>(
  method: Method,
  api: string,
  variables?: string | Object
): Promise<CustomAxiosResult<L, R>> => {
  try {
    const { data }: { data: R } = await axios({
      url: `${defaults.uri}${api}`,
      method,
      data: method !== "GET" ? variables : undefined,
      params: method === "GET" ? variables : undefined,
      headers: defaults.headers(),
    });
    // logger("data", data);
    return { data, isError: false };
  } catch (error) {
    // logger("error", error.message, error.response);
    const errorData: L = error.response?.data || {};
    return { errorData, isError: true };
  }
};

export const login = async (userLoginInfo: UserLoginDTO) =>
  await getAxiosData<IUserLoginResultError, IUserLoginResultSuccess>(
    "POST",
    "/auth/login",
    userLoginInfo
  );

export const getPosts = async () => {
  const result = await getAxiosData<any, IPost[]>("GET", "/posts");
  logger("res", result);
  return result;
};

export const getAllFilesPath = async () => await getAxiosData("GET", "/upload");

export const checkUserAuthenticated = async () =>
  await getAxiosData("GET", "/auth/validate");

export const getPostBySlug = async (slug: string) =>
  await getAxiosData<any, IPost>("GET", `/posts/${slug}`);

export const createPost = async (postData: PostDTO) =>
  await getAxiosData("POST", "/posts/create", postData);

export const createCommentToPostBySlug = async (
  commentBody: CommentDTO,
  targetPostSlug: string
) => await getAxiosData("POST", `/${targetPostSlug}`, commentBody);

export const deletePostBySlug = async (slug: string) =>
  await getAxiosData("DELETE", `/posts/${slug}`);

import axios, { Method } from "axios";
import {
  CommentDTO,
  UserLoginDTO,
  PostDTO,
  IUserLoginResultSuccess,
  IUserLoginResultError,
} from "..";
import { getToken } from "./auth";
import { logger } from "./logger";

interface CustomAxiosResult<L = any, R = any> {
  data?: R;
  errorData?: L;
  isError?: boolean;
}

const defaults = {
  uri: (() => {
    if (process.env.IS_BUILD) return process.env.API_FROM_INTERNET;
    return typeof window === "undefined" ? process.env.NEXT_PUBLIC_API : "/api";
  })(),
  headers: {
    Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
  },
};

const getAxiosData = async <L extends any, R extends any>(
  method: Method,
  api: string,
  variables?: string | Object
): Promise<CustomAxiosResult<L, R>> => {
  try {
    const { data }: { data: R } = await axios.request({
      url: `${defaults.uri}${api}`,
      method,
      data: method === "get" ? variables : undefined,
      headers: defaults.headers,
    });
    logger(data);
    return { data, isError: false };
  } catch (error) {
    logger("error", error.message, error?.statusCode);
    const errorData: L = error.response.data;
    return { errorData, isError: true };
  }
};

export const login = async (userLoginInfo: UserLoginDTO) => {
  const requestData = {
    username: userLoginInfo.email,
    password: userLoginInfo.password,
  };

  return await getAxiosData<IUserLoginResultError, IUserLoginResultSuccess>(
    "POST",
    "/auth/login",
    requestData
  );
};

export const getPosts = async () => await getAxiosData("GET", "/posts");

export const getAllFilesPath = async () => await getAxiosData("GET", "/upload");

export const checkUserAuthenticated = async () =>
  await getAxiosData("GET", "/auth/validate");

export const getPostBySlug = async (slug: string) =>
  await getAxiosData("GET", `/${slug}`);

export const createPost = async (postData: PostDTO) =>
  await getAxiosData("POST", "/posts/create", postData);

export const createCommentToPostBySlug = async (
  commentBody: CommentDTO,
  targetPostSlug: string
) => await getAxiosData("POST", `/${targetPostSlug}`, commentBody);

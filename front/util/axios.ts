import axios from "axios";
import {
  CommentDTO,
  IUserLoginResult,
  IUserLoginResultError,
  IUserLoginResultSuccess,
  UserLoginDTO,
  PostDTO,
  CustomAxiosResult,
} from "..";
import { logger } from "./logger";

const uri = (() => {
  if (process.env.IS_BUILD) return process.env.API_FROM_INTERNET;
  return typeof window === "undefined" ? process.env.NEXT_PUBLIC_API : "/api";
})();

export const login = async (
  userLoginInfo: UserLoginDTO
): Promise<IUserLoginResult> => {
  const requestData = {
    username: userLoginInfo.email,
    password: userLoginInfo.password,
  };

  try {
    const { data } = await axios.post<IUserLoginResultSuccess>(
      `${uri}/auth/login`,
      requestData
    );
    return { success: data };
  } catch (error) {
    const result: IUserLoginResultError = {
      ...error.response.data.response,
    };
    return { error: result };
  }
};

export const checkUserAuthenticated = async (jwt: string) => {
  try {
    await axios.get(`${uri}/auth/validate`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return { isAuthenticated: true };
  } catch (error) {
    return { isAuthenticated: false };
  }
};

export const createPost = async (
  postData: PostDTO,
  jwt: string
): Promise<CustomAxiosResult> => {
  try {
    const { data } = await axios.post(`${uri}/posts/create`, postData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return { data };
  } catch (error) {
    logger("axios createPost", error.message, error?.statusCode);
    return { isError: true };
  }
};

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${uri}/posts`);
    return data;
  } catch (error) {
    logger("error", error.message);
    return null;
  }
};

export const getPostBySlug = async (
  slug: string
): Promise<CustomAxiosResult> => {
  try {
    const { data } = await axios.get(`${uri}/posts/${slug}`);
    return { ...data };
  } catch (error) {
    logger("axios getPostBySlug", error.message);
    return { isError: true };
  }
};

export const deletePostBySlug = async (
  slug: string,
  jwt: string
): Promise<CustomAxiosResult> => {
  try {
    const { data } = await axios.delete(`${uri}/posts/${slug}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    return { data };
  } catch (error) {
    // logger("axios postDelete", error);
    return null;
  }
};

export const createCommentToPostBySlug = async (
  commentBody: CommentDTO,
  targetPostSlug: string,
  jwt: string
): Promise<CustomAxiosResult> => {
  try {
    const { data } = await axios.post(
      `${uri}/comments/create/${targetPostSlug}`,
      commentBody,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    return { data };
  } catch (error) {
    logger("axios createCommentToPostBySlug", error.message);
    return { isError: true };
  }
};

export const getAllFilesPath = async () => {
  const { data } = await axios.get(`${uri}/upload`);
  // logger(data);

  return data;
};

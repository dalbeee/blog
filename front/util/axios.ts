import axios, { AxiosResponse } from "axios";
import {
  CommentDTO,
  IUserLoginResult,
  IUserLoginResultError,
  IUserLoginResultSuccess,
  UserLoginDTO,
  PostDTO,
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

export const getUserInfo = async (jwt: string) => {
  try {
    const { data } = await axios.get(`${uri}/auth/validate`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  } catch (error) {
    return { isAuthenticated: false };
  }
};

export const createPost = async (postData: PostDTO) => {
  try {
    const { data } = await axios.post(`${uri}/posts/create`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    logger(data);
    return data;
  } catch (error) {
    logger("axios createPost", error.message, error?.statusCode);
    const result = { status: "error" };
    return result;
  }
};
// TODO 모든 메서드 에러처리
export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${uri}/posts`);
    return data;
  } catch (error) {
    logger("error", error.message);
    return null;
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const result = await axios.get(`${uri}/posts/${slug}`);
    // logger(data);
    return result.data;
  } catch (error) {
    logger("axios getPostBySlug", error);
  }
};

export const postDeleteBySlug = async (slug: string) => {
  try {
    const { data } = await axios.delete(`${uri}/posts/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return data;
  } catch (error) {
    // logger("axios postDelete", error);
    return null;
  }
};

export const createCommentToPostBySlug = async (
  commentBody: CommentDTO,
  targetPostSlug: string
) => {
  try {
    const { data } = await axios.post(
      `${uri}/comments/create/${targetPostSlug}`,
      commentBody,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    // logger("axios createCommentToPostBySlug", error);
    return null;
  }
};

export const getAllFilesPath = async () => {
  const { data } = await axios.get(`${uri}/upload`);
  // logger(data);
  return null;
  return data;
};

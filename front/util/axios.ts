import axios from "axios";
import { CommentDTO, IUserInfo, IUserLoginInfo, PostDTO } from "..";

const uri =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_API : "/api";

export const login = async (userLoginInfo: IUserLoginInfo) => {
  const requestData = {
    username: userLoginInfo.email,
    password: userLoginInfo.password,
  };
  // console.log("resdata", requestData);
  return null;
  const { data } = await axios.post<IUserInfo>(
    `${uri}/auth/login`,
    requestData
  );
  return data;
};

export const getUserInfo = async (jwt: string) => {
  const { data } = await axios.post(`${uri}/auth/local`, jwt, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};

export const createPost = async (postData: PostDTO) => {
  try {
    return await axios.post(`${uri}/posts/create`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    // console.log("axios createPost", error);
    return null;
  }
};
// TODO 모든 메서드 에러처리
export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${uri}/posts`);
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error.message);
    return null;
    // console.log("axios getPosts", error);
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const { data } = await axios.get(`${uri}/posts/${encodeURI(slug)}`);
    return data;
  } catch (error) {
    // console.log("axios getPostBySlug", error);
    return null;
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
    // console.log("axios postDelete", error);
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
    // console.log("axios createCommentToPostBySlug", error);
    return null;
  }
};

export const getAllFilesPath = async () => {
  const { data } = await axios.get(`${uri}/upload`);
  // console.log(data);
  return null;
  return data;
};

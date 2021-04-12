import axios from "axios";
import { CommentDTO, IUserInfo, IUserLoginInfo, PostDTO } from "..";

export const login = async (userLoginInfo: IUserLoginInfo) => {
  const requestData = {
    username: userLoginInfo.email,
    password: userLoginInfo.password,
  };
  console.log("resdata", requestData);
  const { data } = await axios.post<IUserInfo>(`/api/auth/login`, requestData);
  return data;
};

export const getUserInfo = async (jwt: string) => {
  const { data } = await axios.post(`/api/auth/local`, jwt, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};

export const createPost = async (postData: PostDTO) => {
  try {
    return await axios.post(`/api/posts/create`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.log("axios createPost", error);
  }
};
// TODO 모든 메서드 에러처리
export const getPosts = async () => {
  try {
    const { data } = await axios.get(`/api/posts`);

    return data;
  } catch (error) {
    console.log("axios getPosts", error);
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const { data } = await axios.get(`/api/posts/${encodeURI(slug)}`);
    return data;
  } catch (error) {
    console.log("axios getPostBySlug", error);
  }
};

export const postDeleteBySlug = async (slug: string) => {
  try {
    const { data } = await axios.delete(`/api/posts/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return data;
  } catch (error) {
    console.log("axios postDelete", error);
  }
};

export const createCommentToPostBySlug = async (
  commentBody: CommentDTO,
  targetPostSlug: string
) => {
  try {
    const { data } = await axios.post(
      `/api/comments/create/${targetPostSlug}`,
      commentBody,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("axios createCommentToPostBySlug", error);
  }
};

export const getAllFilesPath = async () => {
  const { data } = await axios.get(`/api/upload`);
  console.log(data);
  return data;
};

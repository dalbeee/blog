import { useState } from "react";
import { IPost, PostDTO } from "..";
import { deletePostBySlug, createPost as axiosCreatePost } from "../util/axios";
import { logger } from "../util/logger";
import { useToastContext } from "./toastContext";
import { useUserContext } from "./userContext";

const postReducer = () => {
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
  const { operation: toast } = useToastContext();
  const { userInfo: user } = useUserContext();

  const createPost = async (post: PostDTO) => {
    const result = await axiosCreatePost(post, user.access_token);
    result.data
      ? toast.push({ title: "알림", content: "포스팅이 성공하였습니다" })
      : toast.push({ title: "알림", content: "포스팅이 실패하였습니다" });
    return result;
  };
  // TODO create update method

  const deletePost = async (slug: string) => {
    const result = await deletePostBySlug(slug, user.access_token);
    logger(result);
    result.data
      ? toast.push({ title: "알림", content: "포스팅 삭제에 성공하였습니다" })
      : toast.push({ title: "알림", content: "포스팅 삭제에 실패하였습니다" });

    return result;
  };
  const operation = { createPost, deletePost };
  return { posts, setPosts, operation };
};

export default postReducer;

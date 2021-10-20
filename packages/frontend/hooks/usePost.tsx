import { CreatePostDTO } from "@blog/core/dist/domain";

import { coreAPI } from "../core/coreAPI";
import { useToastContext } from "../store/toastContext";
import { isServerSide } from "../util/isServerSide";

export const usePost = () => {
  const postService = coreAPI().post;

  const toastAPI = !isServerSide() && useToastContext();

  const getPost = async (postId: string) => postService.getPost(postId);

  const getPosts = async () => await postService.getPosts();

  const createPost = async (post: CreatePostDTO) => {
    return await postService
      .createPost(post)
      .then(() => {
        toastAPI.operation.push({
          title: "알림",
          content: "포스팅을 생성했습니다",
        });
      })
      .catch((e) => {
        toastAPI.operation.push({
          title: "error",
          content: `포스팅 생성에 실패했습니다 ${e}`,
        });
        throw e;
      });
  };

  const deletePost = async (postId: string) => {
    try {
      return postService.deletePost(postId);
    } catch (error) {
      toastAPI.operation.push({
        title: "알림",
        content: "포스팅 삭제에 실패하였습니다",
      });
    }
  };

  return { createPost, getPost, getPosts, deletePost };
};

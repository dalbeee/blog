import { CreatePostDTO } from "@blog/core/dist/domain";
import { PostRepository } from "@blog/core/dist/infrastructure/repository";

import { useToastContext } from "../../store/toastContext";
import { isServerSide } from "../../util/isServerSide";
import { validationService } from "./validationService";

export const postService = (postRepository: PostRepository) => {
  const toastAPI = !isServerSide() && useToastContext();
  const validationAPI = validationService();

  const getPost = async (postId: string) =>
    await postRepository.getPost(postId);
  const getPosts = async () => await postRepository.getPosts();

  const createPost = async (post: CreatePostDTO) => {
    try {
      const postDTO = await validationAPI.getValidation(
        new CreatePostDTO(),
        post
      );
      const result = await postRepository.createPost(postDTO);
      toastAPI.operation.push({
        title: "알림",
        content: "포스팅이 성공하였습니다",
      });
      return result;
    } catch (error) {
      const errorMessage = error?.map(
        (item) => Object.values(item?.constraints)?.[0]
      );
      toastAPI.operation.push({
        title: "알림",
        content: `포스팅 생성에 실패하였습니다\n${errorMessage}`,
      });
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const result = await postRepository.deletePost(postId);
      toastAPI.operation.push({
        title: "알림",
        content: "포스팅 삭제에 성공하였습니다",
      });
      return result;
    } catch (error) {
      toastAPI.operation.push({
        title: "알림",
        content: "포스팅 삭제에 실패하였습니다",
      });
    }
  };
  return { createPost, getPost, getPosts, deletePost };
};

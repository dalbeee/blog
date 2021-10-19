import { PostRepository } from "@blog/core/dist/infrastructure/repository";
import { PostDTO } from "../..";
import { useToastContext } from "../../store/toastContext";

export const postService = (postRepository: PostRepository) => {
  const createPost = async (post: PostDTO) => {
    const toastAPI = useToastContext();

    try {
      const result = await postRepository.createPost(post);
      toastAPI.operation.push({
        title: "알림",
        content: "포스팅이 성공하였습니다",
      });
      return result;
    } catch (error) {
      toastAPI.operation.push({
        title: "알림",
        content: "포스팅 생성에 실패하였습니다",
      });
    }
  };
  // TODO create update method

  deletePost = async (slug: string) => {
    const result = await deletePostBySlug(slug);
    logger(result);
    result.data
      ? toast.push({ title: "알림", content: "포스팅 삭제에 성공하였습니다" })
      : toast.push({ title: "알림", content: "포스팅 삭제에 실패하였습니다" });

    return result;
  };
};

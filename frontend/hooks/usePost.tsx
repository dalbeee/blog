import { coreAPI } from "../core/coreAPI";
import { CreatePostDTO } from "../core/domain";
import { isServerSide } from "../util/isServerSide";

export const usePost = () => {
  const postService = coreAPI().post;

  const core = !isServerSide() && coreAPI();

  const getPost = async (postId: string) => postService.getPost(postId);

  const getPosts = async () => await postService.getPosts();

  const createPost = async (post: CreatePostDTO) => {
    return await postService
      .createPost(post)
      .then(() => {
        core.toast.push("포스팅을 생성하였습니다");
      })
      .catch((e) => {
        core.toast.error("포스팅 생성에 실패하였습니다");

        throw e;
      });
  };

  const deletePost = async (postId: string) => {
    try {
      return postService.deletePost(postId);
    } catch (error) {
      core.toast.error("포스팅 삭제에 실패하였습니다");
    }
  };

  return { createPost, getPost, getPosts, deletePost };
};

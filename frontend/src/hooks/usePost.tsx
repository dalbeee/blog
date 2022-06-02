import { coreAPI } from "../core/coreAPI";
import { isServerSide } from "../util/isServerSide";

export const usePost = () => {
  const postService = coreAPI().post;

  const core = !isServerSide() && coreAPI();

  const getPost = async (postId: string) => postService.getPost(postId);

  const getPosts = async () => await postService.getPosts();

  return { getPost, getPosts };
};

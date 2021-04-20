import { IPost, PostDTO } from "..";
import { deletePostBySlug, createPost as axiosCreatePost } from "../util/axios";
import { logger } from "../util/logger";
import { useToastContext } from "./toastContext";
import { useUserContext } from "./userContext";
import { cloneDeep } from "lodash";

const postReducer = (store) => {
  // const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
  const { posts, setPosts } = store;
  const { operation: toast } = useToastContext();
  const { userInfo: user } = useUserContext();

  const setPostOne = (post: IPost) => {
    setPosts((prev: IPost[]) => {
      if (!prev.length) return [post];

      const targetPost = prev.filter((p) => p.slug === post.slug)[0];
      const targetPostIndexInPosts = prev.findIndex(
        (post) => post.id === targetPost.id
      );

      if (!targetPost || targetPostIndexInPosts === -1) return prev;

      const updatedPosts = cloneDeep(prev);
      updatedPosts[targetPostIndexInPosts] = targetPost;
      logger("updatedpost", updatedPosts);
      return updatedPosts;
    });
  };

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
  return { setPostOne, operation };
};

export default postReducer;

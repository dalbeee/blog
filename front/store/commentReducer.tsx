import { CommentDTO, IPost } from "..";
import { useToastContext } from "./toastContext";
import { useUserContext } from "./userContext";
import { createCommentToPostBySlug } from "../util/axios";
import { cloneDeep } from "lodash";

const commentReducer = (store) => {
  const { setPosts } = store;

  const { userInfo: user } = useUserContext();
  const { operation: toast } = useToastContext();

  const createComment = async (comment: CommentDTO, targetPostSlug: string) => {
    const injectCommentToPostStore = (comment, slug: string) => {
      setPosts((prev: IPost[]) => {
        const newPosts = cloneDeep(prev);
        const targetPost = prev.filter((post) => post.slug === slug)[0];
        const targetPostIndexInPosts = prev.findIndex(
          (post) => post.id === targetPost.id
        );
        const updatedComments = targetPost.comments.concat(comment);
        newPosts[targetPostIndexInPosts].comments = updatedComments;
        return newPosts;
      });
    };

    const result = await createCommentToPostBySlug(
      comment,
      targetPostSlug,
      user.access_token
    );

    result.data
      ? toast.push({ title: "알림", content: "댓글 등록에 성공하였습니다" })
      : toast.push({ title: "알림", content: "댓글 등록에 실패하였습니다" });

    injectCommentToPostStore(result.data, targetPostSlug);
    return result;
  };

  return {
    commentOperation: {
      createComment,
    },
  };
};

export default commentReducer;

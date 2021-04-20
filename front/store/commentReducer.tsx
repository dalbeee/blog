import { CommentDTO } from "..";
import { useToastContext } from "./toastContext";
import { useUserContext } from "./userContext";
import { createCommentToPostBySlug } from "../util/axios";
import { logger } from "../util/logger";

const commentReducer = () => {
  const { userInfo: user } = useUserContext();
  const { operation: toast } = useToastContext();

  const createComment = async (comment: CommentDTO, targetPostSlug: string) => {
    const result = await createCommentToPostBySlug(
      comment,
      targetPostSlug,
      user.access_token
    );
    logger(result);
    result.data
      ? toast.push({ title: "알림", content: "댓글 등록에 성공하였습니다" })
      : toast.push({ title: "알림", content: "댓글 등록에 실패하였습니다" });
    return result;
  };

  return {
    commentOperation: {
      createComment,
    },
  };
};

export default commentReducer;

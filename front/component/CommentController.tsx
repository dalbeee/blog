import { useRouter } from "next/router";
import { useState } from "react";
import { CommentDTO } from "..";
import { usePostContext } from "../store/postContext";

const CommentController = () => {
  const { commentOperation } = usePostContext();

  const [commentInputValue, setCommentInputValue] = useState<CommentDTO>(null);
  const [isCommentWindowActive, setIsCommentWindowActive] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    const comment = commentInputValue;
    const result = await commentOperation.createComment(
      comment,
      router.query.slug as string
    );

    toggleCommentWindowVisible();
  };

  const toggleCommentWindowVisible = () =>
    setIsCommentWindowActive((prev) => !prev);

  return (
    <div
      className={`w-full  border border-gray-200 ${
        isCommentWindowActive ? "block" : "hidden"
      }  `}
    >
      <form onSubmit={onSubmit}>
        <textarea
          className="w-full focus:outline-none"
          name="comment"
          placeholder="댓글을 입력하세요"
          onChange={(e) =>
            setCommentInputValue({
              body: e.target.value,
            })
          }
        />
        <button className="w-full text-xl bg-gray-500 text-gray-50 rounded-xl">
          submit
        </button>
      </form>
    </div>
  );
};

export default CommentController;

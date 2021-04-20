import { useRouter } from "next/router";
import { useState } from "react";
import { CommentDTO } from "..";
import { usePostContext } from "../store/postContext";

const CommentController = () => {
  const { commentOperation, setPosts } = usePostContext();

  const [comment, setComment] = useState<CommentDTO>(null);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await commentOperation.createComment(
      comment,
      router.query.slug as string
    );

    !result.isError && setComment(null);
  };

  return (
    <>
      <div className={`w-full  border border-gray-200 mt-8 `}>
        <form onSubmit={onSubmit}>
          <textarea
            className="w-full h-32 focus:outline-none"
            name="comment"
            placeholder="댓글을 입력하세요"
            onChange={(e) =>
              setComment({
                body: e.target.value,
              })
            }
          />
          <button className="w-full text-xl bg-gray-500 text-gray-50 rounded-xl">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentController;

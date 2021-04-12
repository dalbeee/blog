import { useControllerDetailPageContext } from "../hooks/useControllerDetailPage";

const CommentController = () => {
  const { commentOperation } = useControllerDetailPageContext();

  return (
    <div
      className={`w-full  border border-gray-200 ${
        commentOperation.isCommentWindowActive ? "block" : "hidden"
      }  `}
    >
      <form onSubmit={commentOperation.submitComment}>
        <textarea
          className="w-full focus:outline-none"
          name="comment"
          placeholder="댓글을 입력하세요"
          onChange={(e) =>
            commentOperation.setCommentInputValue({
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

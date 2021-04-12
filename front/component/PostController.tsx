import { useRouter } from "next/router";
import { useControllerDetailPageContext } from "../hooks/useControllerDetailPage";
import { postDeleteBySlug } from "../util/axios";
import CommentController from "./CommentController";

const PostController = () => {
  const router = useRouter();
  const {
    commentOperation: { toggleCommentWindowVisible },
  } = useControllerDetailPageContext();

  //   TODO implement update method
  const onUpdate = async () => {};
  const onDelete = async () => {
    await postDeleteBySlug(router.query.slug as string);
    router.push("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end py-4">
        <div className="mr-4 text-gray-500">
          <button onClick={() => toggleCommentWindowVisible()}>
            <span className="material-icons">rate_review</span>
          </button>
        </div>
        <div className="mr-4 text-gray-500">
          <button onClick={onUpdate}>
            <span className="material-icons">edit</span>
          </button>
        </div>
        <div className="mr-4 text-gray-500">
          <button onClick={onDelete}>
            <span className="material-icons">delete_forever</span>
          </button>
        </div>
      </div>
      <CommentController />
    </div>
  );
};

export default PostController;

import { useRouter } from "next/router";
import { usePostContext } from "../store/postContext";

const PostController = () => {
  const router = useRouter();
  const { post } = usePostContext();

  //   TODO implement update method
  const onDelete = async () => {
    const result = await post.operation.deletePost(router.query.slug as string);
    !result.isError && router.push("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end py-4">
        <div className="mr-4 text-gray-500"></div>
        <div className="mr-4 text-gray-500">
          <button>
            <span className="material-icons">edit</span>
          </button>
        </div>
        <div className="mr-4 text-gray-500">
          <button onClick={onDelete}>
            <span className="material-icons">delete_forever</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostController;

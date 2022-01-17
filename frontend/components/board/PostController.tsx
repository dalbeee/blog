import { useRouter } from "next/router";

import { usePost } from "../../hooks/usePost";

const PostController = () => {
  const router = useRouter();
  const postAPI = usePost();

  //   TODO implement update method
  const onDelete = async () => {
    const result = await postAPI.deletePost(router.query.slug as string);
    !result.isError && router.push("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end py-4">
        <div className="mr-4 text-gray-500"></div>
        <div className="mr-4 text-gray-500">
          <button>
            <span className="material-icons-round">edit</span>
          </button>
        </div>
        <div className="mr-4 text-gray-500">
          <button onClick={onDelete}>
            <span className="material-icons-round">delete_forever</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostController;

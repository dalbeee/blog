import { memo } from "react";
import { usePostContext } from "../store/postContext";
import CardMain from "./CardMain";

const Content = () => {
  const { post } = usePostContext();

  return (
    <div className="w-full px-2 h-content min-h-content">
      {!!post.store.posts?.length ? (
        post.store.posts.map((post, index) => (
          <CardMain post={post} key={index} />
        ))
      ) : (
        <div className="flex items-center justify-center h-content">
          포스트가 없어요😢
        </div>
      )}
    </div>
  );
};

export default memo(Content);

import { usePostContext } from "../store/postContext";
import CardMain from "./CardMain";

const Content = () => {
  const { posts } = usePostContext();

  return (
    <div className="w-full px-2 h-content min-h-content">
      {!!posts?.length ? (
        posts.map((post, index) => <CardMain post={post} key={index} />)
      ) : (
        <div className="flex items-center justify-center h-content">
          포스트가 없어요😢
        </div>
      )}
    </div>
  );
};

export default Content;

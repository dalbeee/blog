import { memo } from "react";
import { Post } from "../../core/domain";

import Card from "./Card";

const Board = ({ posts }: { posts: Post[] }) => {
  if (!posts?.length)
    return (
      <div className="flex items-center justify-center h-content">
        포스트가 없어요😢
      </div>
    );

  return (
    <>
      <div className="w-full px-2 min-h-content grid grid-cols-1 xl:grid-cols-2 gap-4">
        {posts.map((post, index) => (
          <Card post={post} key={index} />
        ))}
      </div>
    </>
  );
};

export default memo(Board);

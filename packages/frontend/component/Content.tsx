import { memo } from "react";

import { Post } from "@blog/core/dist/domain";

import CardMain from "./CardMain";

const Content = ({ posts }: { posts: Post[] }) => {
  // const { post } = usePostContext();

  if (!posts.length)
    return (
      <div className="flex items-center justify-center h-content">
        포스트가 없어요😢
      </div>
    );

  return (
    <div className="w-full px-2 h-content min-h-content">
      {/* {!!post.store.posts?.length ? (
        post.store.posts.map((post, index) => ( */}
      {posts.map((post, index) => (
        <CardMain post={post} key={index} />
      ))}
    </div>
  );
};

export default memo(Content);

import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import { WithServerSideHttpHandler } from "../common/components/WithServerSideHttpHandler";
import { getPosts } from "../post/hooks/usePost";
import { Post } from "../post/types";

const Board = dynamic(() => import("../board/Board"));

export const getServerSideProps: GetServerSideProps = WithServerSideHttpHandler(
  async () => {
    const posts = await getPosts();
    return { props: { posts: posts || [] } };
  }
);

export default function Home({ posts }: { posts: Post[] }) {
  return <Board posts={posts} />;
}

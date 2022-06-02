import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import { WithServerSideHttpHandler } from "../components/core/WithServerSideHttpHandler";
import { coreAPI } from "../core/coreAPI";
import { Post } from "../core/domain";

const Board = dynamic(() => import("../components/board/Board"));

export const getServerSideProps: GetServerSideProps = WithServerSideHttpHandler(
  async () => {
    const core = coreAPI();
    const posts = await core.post.getPosts();
    return { props: { posts: posts || [] } };
  }
);

export default function Home({ posts }: { posts: Post[] }) {
  return <Board posts={posts} />;
}

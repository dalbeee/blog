import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import { coreAPI } from "../core/coreAPI";
import { Post } from "../core/domain";
import { hasBlogInstalled } from "../util/hasBlogInstalled";

const Board = dynamic(() => import("../components/board/Board"));

export const getServerSideProps: GetServerSideProps = async () => {
  const core = coreAPI();

  if (!(await hasBlogInstalled())) {
    return {
      redirect: {
        destination: "/first_setting",
        permanent: false,
      },
    };
  }

  const posts = await core.post.getPosts();
  return { props: { posts: posts || [] } };
};

export default function Home({ posts }: { posts: Post[] }) {
  return <Board posts={posts} />;
}

import { GetServerSideProps } from "next";

import Board from "../components/board/Board";
import { coreAPI } from "../core/coreAPI";
import { Post } from "../core/domain";
import { hasBlogInstalled } from "../util/hasBlogInstalled";

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

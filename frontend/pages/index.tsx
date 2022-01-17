import { GetStaticProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Board from "../components/board/Board";
import { coreAPI } from "../core/coreAPI";
import { Post } from "../core/domain";

export const getStaticProps: GetStaticProps = async () => {
  const core = coreAPI();

  try {
    const posts = await core.post.getPosts();
    return { props: { posts }, revalidate: 5 };
  } catch (error) {
    return {
      props: { posts: [] },
      revalidate: 5,
    };
  }
};

export default function Home({ posts }: { posts: Post[] }) {
  const core = coreAPI();
  const router = useRouter();

  useEffect(() => {
    core.config.getKeyValue("IS_DONE_BLOG_SETTING").then((r) => {
      if (!r) router.push("/first_setting");
    });
  }, []);

  return <Board posts={posts} />;
}

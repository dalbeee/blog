import { GetStaticProps } from "next";

import Board from "../components/board/Board";
import { coreAPI } from "../core/coreAPI";
import { Post } from "../core/domain";

export const getStaticProps: GetStaticProps = async () => {
  const core = coreAPI();

  const checkBlogStatus = async () =>
    await core.config
      .getKeyValue("IS_DONE_BLOG_SETTING")
      .then((r) => {
        return r?.value !== "undefined";
      })
      .catch((e) => {
        return e?.status !== 502 && false;
      });

  if (!checkBlogStatus()) {
    return {
      redirect: {
        destination: "/first_setting",
        statusCode: 307,
      },
      props: {},
      revalidate: 5,
    };
  }

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
  return <Board posts={posts} />;
}

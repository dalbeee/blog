import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

import { getPosts } from "../post/hooks/usePost";
import { Post } from "../post/types";

const Board = dynamic(() => import("../board/Board"));

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return { props: { posts }, revalidate: 60 };
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>blog</title>
      </Head>
      <Board posts={posts} />
    </>
  );
}

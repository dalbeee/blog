import { GetStaticProps } from "next";
import { useEffect } from "react";
import Layout from "../component/Layout";
import { IPost } from "..";
import { usePostContext } from "../store/postContext";
import { getPosts } from "../util/axios";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: { posts },
  };
};

export default function Home({ posts }: { posts: IPost[] }) {
  if (typeof window === "undefined") return null;

  const { setPosts } = usePostContext();
  useEffect(() => {
    setPosts(posts);
  }, []);

  return (
    <div>
      <Layout />
    </div>
  );
}

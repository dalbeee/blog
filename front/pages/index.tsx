import { GetStaticProps } from "next";
import { useEffect } from "react";
import Layout from "../component/Layout";
import { IPost } from "..";
import { usePostContext } from "../store/postContext";
import { getPosts } from "../util/axios";

export const getStaticProps: GetStaticProps = async () => {
  const { data: posts } = await getPosts();
  return {
    props: { posts },
    revalidate: 1,
  };
};

export default function Home({ posts }: { posts: IPost[] }) {
  const { post } = usePostContext();

  useEffect(() => {
    post.operation.setPosts(posts);
  }, []);

  return <Layout />;
}

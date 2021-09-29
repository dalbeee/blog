import { GetStaticProps } from "next";
import { useEffect } from "react";
import Layout from "../component/Layout";
import { IPost } from "..";
import { usePostContext } from "../store/postContext";
import { getPosts } from "../util/axios";

export const getStaticProps: GetStaticProps = async () => {
  let { data: posts } = await getPosts();
  if (!posts) posts = [];
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

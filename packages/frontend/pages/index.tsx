import { GetStaticProps } from "next";
import { useEffect } from "react";
import Layout from "../component/Layout";
import { IPost } from "..";
import { usePostContext } from "../store/postContext";
import { getPosts } from "../util/axios";
import useNotion from "../hooks/useNotion";

export const getStaticProps: GetStaticProps = async () => {
  const notionAPI = useNotion();
  let posts = await notionAPI.getPosts("4a31fcbc35a14835a01cbdb421525d09");
  if (!posts) posts = [];
  return {
    props: { posts },
    revalidate: 1,
  };
};

export default function Home({ posts }: { posts: IPost[] }) {
  console.log(posts);
  const { post } = usePostContext();

  useEffect(() => {
    post.operation.setPosts(posts);
  }, []);

  return <Layout />;
}

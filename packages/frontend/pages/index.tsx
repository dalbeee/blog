import { GetStaticProps } from "next";
import Layout from "../component/Layout";
import { IPost } from "..";
import { usePostContext } from "../store/postContext";
import usePost from "../hooks/usePost";
import { useEffect } from "react";

export const getStaticProps: GetStaticProps = async () => {
  const postAPI = usePost();
  let posts = await postAPI.getPosts();
  if (!posts) posts = [];
  return {
    props: { posts },
    revalidate: 5,
  };
};

export default function Home({ posts }: { posts: IPost[] }) {
  const { post } = usePostContext();
  useEffect(() => {
    const getPosts = async () => post.operation.setPosts(posts);
    getPosts();
  }, []);

  return <Layout />;
}

import { GetStaticProps } from "next";
import Layout from "../component/Layout";
import { IPost } from "..";
import { usePostContext } from "../store/postContext";
import usePost from "../hooks/usePost";
import { useEffect } from "react";

export const getStaticProps: GetStaticProps = async () => {
  const postAPI = usePost();

  try {
    let posts = await postAPI.getPosts();

    return {
      props: { posts },
      revalidate: 5,
    };
  } catch (error) {
    if (error.status === 502) {
      return {
        redirect: {
          destination: "/502",
          permanent: false,
        },
      };
    }
  }
};

export default function Home({ posts }: { posts: IPost[] }) {
  const { post } = usePostContext();
  useEffect(() => {
    const getPosts = async () => post.operation.setPosts(posts);
    getPosts();
  }, []);

  return <Layout />;
}

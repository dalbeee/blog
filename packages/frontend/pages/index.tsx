import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";

import { Post } from "@blog/core/dist/domain";

import Content from "../components/Content";
import { coreAPI } from "../core/coreAPI";
import { usePost } from "../hooks/usePost";

export const getServerSideProps: GetServerSideProps = async () => {
  const core = coreAPI();

  try {
    const getConfig = await core.config.getKeyValue("IS_DONE_BLOG_SETTING");
    const conf = { getConfig };
    if (!conf.getConfig) {
      return {
        redirect: {
          destination: "/first_setting",
          permanent: true,
        },
      };
    }
    return { props: {} };
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

// export const getStaticProps: GetStaticProps = async () => {
//   const core = coreAPI();

//   // try {

//   let posts = (await core.post.getPosts()) || [];

//   return {
//     props: { posts },
//     revalidate: 5,
//   };
//   // } catch (error) {
//   //   if (error.status === 502) {
//   //     return {
//   //       redirect: {
//   //         destination: "/502",
//   //         permanent: false,
//   //       },
//   //     };
//   //   }
//   // }
// };

// export default function Home({ posts }: { posts: Post[] }) {
export default function Home() {
  const postAPI = usePost();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postAPI.getPosts().then((r) => setPosts(r));
  }, []);

  return <Content posts={posts} />;
}

import { useEffect, useState } from "react";

import { Post } from "@blog/core/dist/domain";

import { usePost } from "../hooks/usePost";
import Content from "../component/Content";

// export const getStaticProps: GetStaticProps = async () => {
//   const postAPI = usePost();

//   // try {
//   let posts = (await postAPI.getPosts()) || [];

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

// export default function Home({ posts }: { posts: IPost[] }) {
export default function Home() {
  const postAPI = usePost();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postAPI.getPosts().then((r) => setPosts(r));
  }, []);

  return <Content posts={posts} />;
}

import { GetServerSideProps } from "next";

import useNotion from "../hooks/useNotion";

export const getServerSideProps: GetServerSideProps = async () => {
  const postId = "5581c4fc98c0469392d3e2d82468e702";

  const notionAPI = useNotion();
  const post = await notionAPI.getPost(postId);
  console.log(post);
  return {
    props: { post },
  };
};

const test = ({ post }) => {
  console.log(post);
  // const notion = useNotion();
  // useEffect(() => {
  //   notion.post.then((r) => {
  //     console.log(r);
  //   });
  // });

  // useEffect(() => {
  //   const result = notion.parseNotionPostToMarkdown(pageBlock);
  //   console.log(result);
  // }, []);

  return <></>;
};

export default test;

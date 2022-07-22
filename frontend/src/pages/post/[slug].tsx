import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";

import { getPost, getPosts } from "../../post/hooks/usePost";
import { Post } from "../../post/types";
import { fileGetter } from "../../util/fileGetter";

const PostDetail = dynamic(() => import("../../post/components/PostDetail"));

export const getStaticProps: GetStaticProps = async (context) => {
  const post: Post = await getPost(context.params.slug as string);
  await fileGetter(post.thumbnail);
  return {
    props: { post },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const getPostsData = await getPosts();
  const paths = [];

  getPostsData?.length &&
    getPostsData.map((post) => paths.push({ params: { slug: post.id } }));

  return {
    paths: paths,
    fallback: true,
  };
};

const PostPage = ({ post }: { post: Post }) => {
  if (!post) return null;
  return <PostDetail post={post} />;
};

export default PostPage;

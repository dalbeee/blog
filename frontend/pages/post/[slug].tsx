import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";

import { usePost } from "../../hooks/usePost";
import { Post } from "../../core/domain";

const PostDetail = dynamic(() => import("../../components/PostDetail"));

export const getStaticProps: GetStaticProps = async (context) => {
  const postAPI = usePost();

  try {
    const post = await postAPI.getPost(context.params.slug as string);
    return {
      props: { post },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postAPI = usePost();
  try {
    const getPostsData = await postAPI.getPosts();
    const paths = [];

    getPostsData?.length &&
      getPostsData.map((post) => paths.push({ params: { slug: post.id } }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

const PostPage = ({ post }: { post: Post }) => {
  return <PostDetail post={post} />;
};

export default PostPage;

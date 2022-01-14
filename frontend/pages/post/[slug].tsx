import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";
import { useRouter } from "next/router";

import PostController from "../../components/PostController";
import { usePost } from "../../hooks/usePost";
import { Post } from "../../core/domain";
import ImageProvider from "../../components/core/ImageProvider";

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

const PostDetail = ({ post }: { post: Post }) => {
  const router = useRouter();
  if (router.isFallback) return <div>loading...</div>;

  if (!post) return null;

  const renderers: Components = {
    img: (image: any) => {
      return (
        <div
          className="relative overflow-hidden "
          style={{ width: "100%", maxHeight: "100%", minHeight: 400 }}
        >
          <ImageProvider url={`/${image?.src}`} />
        </div>
      );
    },
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-11/12" style={{ maxWidth: "860px" }}>
        <div className="py-4 text-4xl font-semibold text-gray-700">
          {post.title}
        </div>
        <PostController />
        <ReactMarkdown
          className="w-full py-4 text-gray-700 break-words markdown"
          // transformImageUri={img}
          components={renderers}
        >
          {post.content}
        </ReactMarkdown>
        {/* <Comment comments={post.comments} /> */}
        {/* <CommentController /> */}
      </div>
    </div>
  );
};

export default PostDetail;

import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

import { Post } from "@blog/core/dist/domain";

import PostController from "../../components/PostController";
import { usePost } from "../../hooks/usePost";

export const getStaticProps: GetStaticProps = async (context) => {
  const postAPI = usePost();

  try {
    const post = await postAPI.getPost(context.params.slug as string);

    const url = context.params.slug;
    return {
      props: { post, url },
      revalidate: 5,
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
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
  if (!post) return null;
  return (
    <div className="flex justify-center w-full">
      <div className="w-11/12" style={{ maxWidth: "860px" }}>
        <div className="py-4 text-4xl font-semibold text-gray-700">
          {post.title}
        </div>
        <PostController />
        <ReactMarkdown className="w-full py-4 text-gray-700 break-words markdown">
          {post.content}
        </ReactMarkdown>
        {/* <Comment comments={post.comments} /> */}
        {/* <CommentController /> */}
      </div>
    </div>
  );
};

export default PostDetail;

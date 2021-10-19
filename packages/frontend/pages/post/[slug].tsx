import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

import { IPost } from "../..";
import Http404 from "../../component/page/Http404";
import PostController from "../../component/PostController";
import usePost from "../../hooks/usePost";

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
  const getPostsData = await postAPI.getPosts();
  const paths = [];

  getPostsData?.length &&
    getPostsData.map((post) => paths.push({ params: { slug: post.id } }));

  return {
    paths,
    fallback: true,
  };
};

const PostDetail = ({ post }: { post: IPost }) => {
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

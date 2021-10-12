import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

import { IPost } from "../..";
import Comment from "../../component/Comment";
import CommentController from "../../component/CommentController";
import NotFound from "../../component/page/NotFound";
import PostController from "../../component/PostController";
import useNotion from "../../hooks/useNotion";

export const getStaticProps: GetStaticProps = async (context) => {
  const notionAPI = useNotion();
  const postContent = await notionAPI.getPost(context.params.slug as string);
  const postTitle = (await notionAPI.getPosts()).filter(
    (post) => post.id === context.params.slug
  )[0].title;

  const post = { title: postTitle, content: postContent as string };

  const url = context.params.slug;
  return {
    props: { post, url },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const notionAPI = useNotion();
  const getPostsData = await notionAPI.getPosts();
  const paths = [];

  getPostsData?.length &&
    getPostsData.map((post) => paths.push({ params: { slug: post.id } }));

  return {
    paths,
    fallback: true,
  };
};

const PostDetail = ({ post }: { post: IPost }) => {
  if (!post) return <NotFound />;

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

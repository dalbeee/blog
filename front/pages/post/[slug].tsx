import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IPost } from "../..";
import Comment from "../../component/Comment";
import CommentController from "../../component/CommentController";
import PostController from "../../component/PostController";
import { usePostContext } from "../../store/postContext";
import { getPostBySlug, getPosts } from "../../util/axios";

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getPostBySlug(context.params.slug as string);

  return {
    props: { post },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const getPostsData: IPost[] = await getPosts();
  const paths = [];

  getPostsData &&
    !!getPostsData.length &&
    getPostsData.map((post) => paths.push({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: true,
  };
};

const PostDetail = ({ post }: { post: IPost }) => {
  if (!post) return <div>loading</div>;

  const { post: postContext } = usePostContext();
  const [targetPost, setTargetPost] = useState<IPost>();

  useEffect(() => postContext.operation.setPostOne(post), []);

  useEffect(() => {
    setTargetPost(
      postContext.store.posts.filter((p) => p.slug === post.slug)[0]
    );
  }, [postContext.store.posts]);

  if (!targetPost) return <div>loading</div>;

  return (
    <div className="flex justify-center w-full">
      <div className="w-11/12" style={{ maxWidth: "860px" }}>
        <div className="py-4 text-4xl font-semibold text-gray-700">
          {targetPost.title}
        </div>
        <PostController />
        <ReactMarkdown className="w-full py-4 text-gray-700 break-words markdown">
          {targetPost.content}
        </ReactMarkdown>
        <Comment comments={targetPost.comments} />
        <CommentController />
      </div>
    </div>
  );
};

export default PostDetail;

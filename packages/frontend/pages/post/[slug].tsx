import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IPost } from "../..";
import Comment from "../../component/Comment";
import CommentController from "../../component/CommentController";
import PostController from "../../component/PostController";
import useNotion from "../../hooks/useNotion";
import { usePostContext } from "../../store/postContext";
import { getPostBySlug, getPosts } from "../../util/axios";
import { logger } from "../../util/logger";

export const getStaticProps: GetStaticProps = async (context) => {
  // const { data: post } = await getPostBySlug(context.params.slug as string);
  const notionAPI = useNotion();
  const post = await notionAPI.getPost(context.params.slug as string);
  console.log(post);
  return {
    props: { post: { title: "string", content: post } },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const { data: getPostsData } = await getPosts();
  const notionAPI = useNotion();
  const getPostsData = await notionAPI.getPosts(
    "4a31fcbc35a14835a01cbdb421525d09"
  );
  const paths = [];
  // logger(getPostsData);

  getPostsData &&
    !!getPostsData.length &&
    getPostsData.map((post) => paths.push({ params: { slug: post.id } }));
  // getPostsData.map((post) => paths.push({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: true,
  };
};

const PostDetail = ({ post }: { post: IPost }) => {
  console.log(post);
  // if (!post) return <div>loading</div>;

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
        {/* <Comment comments={targetPost.comments} /> */}
        {/* <CommentController /> */}
      </div>
    </div>
  );
};

export default PostDetail;

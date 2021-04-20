import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { IPost } from "../..";
import Comment from "../../component/Comment";
import PostController from "../../component/PostController";
import { getPostBySlug, getPosts } from "../../util/axios";
import { logger } from "../../util/logger";

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getPostBySlug(context.params.slug as string);

  return {
    props: { post },
    revalidate: 60,
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

  return (
    <div className="flex justify-center w-full">
      <div className="w-11/12" style={{ maxWidth: "860px" }}>
        <div className="py-4 text-4xl font-semibold text-gray-700">
          {post.title}
        </div>
        <ReactMarkdown className="w-full py-4 text-gray-700 break-words markdown">
          {post.content}
        </ReactMarkdown>
        {/* post controller */}
        <PostController />
        {/* comments */}
        {post.comments && <Comment comments={post.comments} />}
      </div>
    </div>
  );
};

export default PostDetail;

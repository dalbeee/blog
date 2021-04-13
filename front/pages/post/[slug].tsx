import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { IPost } from "../..";
import Comment from "../../component/Comment";
import PostController from "../../component/PostController";
import { ControllerDetailPageProvider } from "../../hooks/useControllerDetailPage";
import { getPostBySlug, getPosts } from "../../util/axios";

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getPostBySlug(context.params.slug as string);

  return {
    props: { post },
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
  if (typeof window === "undefined") return null;

  if (!post) return <div>loading</div>;

  return (
    <ControllerDetailPageProvider>
      <div className="flex justify-center">
        <div className="w-11/12" style={{ maxWidth: "860px" }}>
          <div className="py-4 text-4xl font-semibold text-gray-700">
            {post.title}
          </div>
          <ReactMarkdown
            className="py-4 text-gray-700 break-words markdown"
            // renderers={renderers}
          >
            {post.content}
          </ReactMarkdown>
          {/* post controller */}
          <PostController />
          {/* comments */}
          {post.comments && <Comment comments={post.comments} />}
        </div>
      </div>
    </ControllerDetailPageProvider>
  );
};

export default PostDetail;

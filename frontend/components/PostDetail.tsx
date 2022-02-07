import React from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";

import PostController from "./board/PostController";
import ImageProvider from "./core/providers/ImageProvider";
import { Post } from "../core/domain";

const PostDetail = ({ post }: { post: Post }) => {
  // if (!post) return null;

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

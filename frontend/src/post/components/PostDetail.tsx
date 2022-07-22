import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";

import ImageProvider from "../../common/providers/ImageProvider";
import { Post } from "../types";

const renderers: Components = {
  img: (image: any) => {
    return (
      <div
        className="relative overflow-hidden "
        style={{ width: "100%", maxHeight: "100%", minHeight: 400 }}
      >
        <ImageProvider url={image?.src} />
      </div>
    );
  },
};
const PostDetail = ({ post }: { post: Post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="flex justify-center w-full">
        <div className="w-11/12" style={{ maxWidth: "860px" }}>
          <h1 className="py-4 text-4xl font-semibold text-gray-700">
            {post.title}
          </h1>
          <ReactMarkdown
            className="w-full py-4 text-gray-700 break-words markdown"
            components={renderers}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default PostDetail;

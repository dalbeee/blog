import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import { memo, useState } from "react";

import { Post } from "../../core/domain";
import ImageComponent from "../core/providers/ImageProvider";

const CardMain = ({ post }: { post: Post }) => {
  if (!post) return null;

  const [thumbnail] = useState(
    post.thumbnail
      ? post.thumbnail[0] !== "/"
        ? `/${post.thumbnail}`
        : post.thumbnail
      : null
  );

  return (
    <>
      <div className="flex flex-col p-4 overflow-hidden rounded-xl border-gray-300 border-2">
        <Link href={`/post/${post.id}`}>
          <a>
            <div className="relative w-full overflow-hidden h-48">
              {thumbnail && <ImageComponent url={thumbnail} />}
            </div>
            <div className="h-40 px-2">
              <div className="w-full text-md text-gray-700 truncate">
                {post.title}
              </div>
              <div className="w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis h-28">
                {post.description}
              </div>
              <div className="text-right w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis  ">
                {post.createdAt &&
                  formatDistance(
                    new Date(),
                    parseISO(post.createdAt.toString())
                  )}
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default memo(CardMain);

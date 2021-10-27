import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import { memo, useState } from "react";

import { Post } from "@blog/core/dist/domain";

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
    <Link href={`/post/${post.id}`}>
      <a>
        <div className="flex flex-col w-full mb-4 overflow-hidden h-1/3 rounded-xl border-gray-300 border-2">
          <div className="relative w-full overflow-hidden h-3/5">
            {thumbnail && (
              <img
                src={thumbnail}
                // objectFit="cover"
                // layout="fill"
                style={{ objectFit: "cover", overflow: "hidden" }}
                className="w-full h-full"
              />
            )}
          </div>
          <div className="bg-gray-100 h-2/5 px-2">
            <div className="w-full text-xl text-gray-700 truncate h-1/3">
              {post.title}
            </div>
            <div className="w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis h-1/3">
              {post.content}
            </div>
            <div className="text-right w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis h-1/3">
              {post.createdAt &&
                formatDistance(new Date(), parseISO(post.createdAt.toString()))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default memo(CardMain);

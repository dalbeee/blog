import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { memo } from "react";

import ImageComponent from "../common/providers/ImageProvider";
import { Post } from "../post/types";

dayjs.extend(relativeTime);

const CardMain = ({ post }: { post: Post }) => {
  if (!post) return null;

  return (
    <>
      <div className="flex flex-col p-4 overflow-hidden rounded-xl border-gray-300 border-2">
        <Link href={`/post/${post.id}`}>
          <a>
            <div className="relative w-full overflow-hidden h-48">
              {post.thumbnail && <ImageComponent url={post.thumbnail} />}
            </div>
            <div className="h-40 px-2">
              <div className="w-full text-md text-gray-700 truncate">
                {post.title}
              </div>
              <div className="w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis h-28">
                {post.description}
              </div>
              <div className="text-right w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis  ">
                {post.createdAt && dayjs(post.createdAt).fromNow()}
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default memo(CardMain);

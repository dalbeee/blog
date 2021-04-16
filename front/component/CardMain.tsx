import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IPost } from "..";

const CardMain = ({ post }: { post: IPost }) => {
  if (!post) return null;

  const [thumbnail, setThumbnail] = useState(
    post.thumbnail
      ? post.thumbnail[0] !== "/"
        ? `/${post.thumbnail}`
        : post.thumbnail
      : null
  );

  return (
    <Link href={`/post/${post.slug}`}>
      <a>
        <div className="flex flex-col w-full mb-4 overflow-hidden h-1/3 rounded-xl">
          <div className="relative w-full overflow-hidden h-3/5">
            <img
              src={thumbnail || "/photo1.jpg"}
              // objectFit="cover"
              // layout="fill"
              style={{ objectFit: "cover", overflow: "hidden" }}
            />
          </div>
          <div className="bg-gray-100 h-2/5">
            <div className="w-full text-xl text-gray-700 truncate h-1/3">
              {post.title}
            </div>
            <div className="w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis h-2/3">
              {post.description}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardMain;

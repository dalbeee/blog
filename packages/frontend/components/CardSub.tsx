import Image from "next/image";
import Link from "next/link";

import { Post } from "@blog/core/dist/domain";

const cardSub = ({ post }: { post: Post }) => {
  if (!post) return null;

  return (
    <div className="flex flex-col w-full mb-4 overflow-hidden h-1/3 rounded-xl">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative w-full h-3/5">
          <Image
            src={post.thumbnail || "/photo1.jpg"}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="relative bg-gray-100 h-2/5">
          <div className="w-full text-2xl text-gray-700 h-1/3 ">
            {post.title}
          </div>
          <div className="w-full overflow-hidden text-gray-400 whitespace-pre-wrap overflow-ellipsis h-2/3">
            {post.description}
          </div>
          {/* author */}
          <div className="absolute bottom-4 right-4">
            {post.user?.username || "noname"}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default cardSub;

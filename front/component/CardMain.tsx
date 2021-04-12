import Image from "next/image";
import Link from "next/link";
import { IPost } from "..";

const CardMain = ({ post }: { post: IPost }) => {
  if (!post) return null;

  return (
    <Link href={`/post/${post.slug}`}>
      <div className="flex flex-col w-full mb-4 overflow-hidden h-1/3 rounded-xl">
        <div className="relative w-full h-3/5">
          <Image
            src={post.thumbnail || "/photo1.jpg"}
            objectFit="cover"
            layout="fill"
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
    </Link>
  );
};

export default CardMain;

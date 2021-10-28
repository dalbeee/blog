import { GetStaticProps } from "next";

import { Post } from "@blog/core/dist/domain";

import Content from "../components/Content";
import { coreAPI } from "../core/coreAPI";

export const getStaticProps: GetStaticProps = async () => {
  const core = coreAPI();

  // try {

  const getConfig = await core.config.getKeyValue("IS_DONE_BLOG_SETTING");
  const conf = { getConfig };
  if (!conf.getConfig) {
    return {
      redirect: {
        destination: "/first_setting",
        permanent: true,
      },
    };
  }

  const posts = (await core.post.getPosts()) || [];
  return {
    props: { posts, conf },
    revalidate: 5,
  };
  // } catch (error) {
  //   if (error.status === 502) {
  //     return {
  //       redirect: {
  //         destination: "/502",
  //         permanent: false,
  //       },
  //     };
  //   }
  // }
};

export default function Home({ posts, conf }: { posts: Post[]; conf: object }) {
  // export default function Home() {

  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   postAPI.getPosts().then((r) => setPosts(r));
  // }, []);

  return <Content posts={posts} />;
}

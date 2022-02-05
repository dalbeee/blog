import { GetServerSideProps } from "next";

import { blogInstall } from "../util/blogConfig";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await blogInstall();
    return { redirect: { destination: "/", permanent: false } };
  } catch (error) {
    throw new Error("blog install failed");
  }
};

const bloginstall = () => {
  return <></>;
};

export default bloginstall;

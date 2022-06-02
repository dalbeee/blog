import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import { hasBlogInstalled } from "../util/blogConfig";

const FirstSetting = dynamic(() => import("../components/FirstSetting"));

export const getServerSideProps: GetServerSideProps = async () => {
  if (await hasBlogInstalled()) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const firstSetting = () => {
  return <FirstSetting />;
};

export default firstSetting;

import { GetServerSideProps } from "next";
import { FC } from "react";

import AdminLayout from "../../../components/admin/Layout";
import Notion from "../../../components/admin/plugin/notion/Notion";
import AuthRouter from "../../../components/core/router/AuthRouter";
import { coreAPI } from "../../../core/coreAPI";

interface Data {
  NOTION_API_KEY: string;
  NOTION_DATABASE_ID: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const configAPI = coreAPI().notion;
  const result = await configAPI.getConfigData();

  return {
    props: { props: result },
  };
};

const notion: FC<{ props: Data }> = ({ props }) => {
  return (
    <>
      <AuthRouter role="admin">
        <AdminLayout>
          <Notion
            notionAPiKey={props?.NOTION_API_KEY}
            notionDatabaseId={props?.NOTION_DATABASE_ID}
          />
        </AdminLayout>
      </AuthRouter>
    </>
  );
};

export default notion;

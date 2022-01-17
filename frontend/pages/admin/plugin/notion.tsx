import { GetServerSideProps } from "next";
import { FC } from "react";

import AdminLayout from "../../../components/admin/Layout";
import Notion from "../../../components/admin/plugin/notion/Notion";
import AuthRouter from "../../../components/core/router/AuthRouter";
import { useNotion } from "../../../hooks/useNotion";

export interface NotionData {
  NOTION_API_KEY?: string;
  NOTION_DATABASE_ID?: string;
  activeStatus: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notionApi = useNotion();

  const configData = notionApi.getConfigData();
  const activeStatus = notionApi.activeStatus();

  const result = await Promise.all([configData, activeStatus]);

  return {
    props: { props: result },
  };
};

const notion: FC<{ props: NotionData }> = ({ props }) => {
  return (
    <>
      <AuthRouter role="admin">
        <AdminLayout>
          <Notion
            notionAPiKey={props?.NOTION_API_KEY}
            notionDatabaseId={props?.NOTION_DATABASE_ID}
            activeStatus={props?.[1]}
          />
        </AdminLayout>
      </AuthRouter>
    </>
  );
};

export default notion;

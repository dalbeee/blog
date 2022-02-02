import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { FC } from "react";

import { useNotion } from "../../../hooks/useNotion";

const AdminLayout = dynamic(() => import("../../../components/admin/Layout"));
const Notion = dynamic(
  () => import("../../../components/admin/plugin/notion/Notion")
);
const AuthRouter = dynamic(
  () => import("../../../components/core/router/AuthRouter")
);

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

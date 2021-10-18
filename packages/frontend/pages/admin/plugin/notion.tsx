import { GetStaticProps } from "next";
import AdminLayout from "../../../component/admin/Layout";
import Notion from "../../../component/admin/plugin/notion/Notion";
import useConfig from "../../../hooks/useConfig";

export const getStaticProps: GetStaticProps = async (context) => {
  const configAPI = useConfig();
  const notionApiKey = await configAPI.getKeyValue("NOTION_API_KEY");
  const notionDatabaseId = await configAPI.getKeyValue("NOTION_DATABASE_ID");

  const req = await Promise.all([notionApiKey, notionDatabaseId]);

  const object = req.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return {
    props: { ...object },
  };
};

const notion = (req: any) => {
  return (
    <>
      <AdminLayout>
        <Notion
          notionAPiKey={req.NOTION_API_KEY}
          notionDatabaseId={req.NOTION_DATABASE_ID}
        />
      </AdminLayout>
    </>
  );
};

export default notion;

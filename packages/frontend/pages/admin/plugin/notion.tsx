import { useEffect, useState } from "react";
import AdminLayout from "../../../component/admin/Layout";
import Notion from "../../../component/admin/plugin/notion/Notion";
import Loading from "../../../component/page/Loading";
import useConfig from "../../../hooks/useConfig";

interface Data {
  NOTION_API_KEY: string;
  NOTION_DATABASE_ID: string;
}

const notion = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [isFetched, setIsFetched] = useState(false);
  const configAPI = useConfig();

  useEffect(() => {
    const getData = async () => {
      const notionApiKey = await configAPI.getKeyValue("NOTION_API_KEY");
      const notionDatabaseId = await configAPI.getKeyValue(
        "NOTION_DATABASE_ID"
      );

      const req = await Promise.all([notionApiKey, notionDatabaseId]);

      const object = req.reduce((acc, item) => {
        if (!item) return acc;
        acc[item.key] = item.value;
        return acc;
      }, {});

      setData(object);
      setIsFetched(true);
    };
    getData();
  }, []);

  if (!isFetched) return <Loading />;
  return (
    <>
      <AdminLayout>
        <Notion
          notionAPiKey={data?.NOTION_API_KEY}
          notionDatabaseId={data?.NOTION_DATABASE_ID}
        />
      </AdminLayout>
    </>
  );
};

export default notion;

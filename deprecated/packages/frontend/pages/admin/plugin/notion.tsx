import { useEffect, useState } from "react";

import AdminLayout from "../../../components/admin/Layout";
import Notion from "../../../components/admin/plugin/notion/Notion";
import Loading from "../../../components/page/Loading";
import AuthRouter from "../../../components/router/AuthRouter";
import { coreAPI } from "../../../core/coreAPI";

interface Data {
  NOTION_API_KEY: string;
  NOTION_DATABASE_ID: string;
}

const notion = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [isFetched, setIsFetched] = useState(false);
  const configAPI = coreAPI().notion;

  useEffect(() => {
    const getData = async () => {
      const result = await configAPI.getConfigData();

      setData(result);
      setIsFetched(true);
    };
    getData();
  }, []);

  if (!isFetched) return <Loading />;

  return (
    <>
      <AuthRouter role="admin">
        <AdminLayout>
          <Notion
            notionAPiKey={data?.NOTION_API_KEY}
            notionDatabaseId={data?.NOTION_DATABASE_ID}
          />
        </AdminLayout>
      </AuthRouter>
    </>
  );
};

export default notion;

import { AxiosRequestConfig } from "axios";

import { notion, infrastructure } from "@blog/core";

const useNotion = () => {
  const url = "https://api.notion.com/v1";
  const config: AxiosRequestConfig = {
    headers: {
      "Notion-Version": "2021-08-16",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_NOTION}`,
    },
    withCredentials: true,
  };
  const axios = new infrastructure.Axios(url, config);
  const repository = new notion.NotionRepository(axios);
  const notionAPI = new notion.NotionUseCase(repository);

  return notionAPI;
};

export default useNotion;

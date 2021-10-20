import { useRouter } from "next/router";

import { ConfigDTO } from "@blog/core/dist/domain";

import { coreAPI } from "../core/coreAPI";
import { useToastContext } from "../store/toastContext";

export const useNotion = () => {
  const toastAPI = useToastContext();
  const router = useRouter();

  const notionAPI = coreAPI().notion;

  const sync = async () => {
    await notionAPI
      .sync()
      .then(() => {
        toastAPI.operation.push({
          title: "info",
          content: "노션 데이터 동기화를 시작했습니다",
        });
      })
      .catch(() => {
        toastAPI.operation.push({
          title: "info",
          content: "노션 데이터 동기화에 실패했습니다",
        });
      });
  };

  const saveConfig = async (data: ConfigDTO[]): Promise<any> => {
    await notionAPI
      .setKeyValue(data)
      .then((r) => {
        toastAPI.operation.push({
          title: "info",
          content: "데이터를 저장했습니다",
        });
        router.push("/admin/plugin/notion");
      })
      .catch(() => {
        toastAPI.operation.push({
          title: "info",
          content: "데이터를 저장에 실패했습니다",
        });
      });
  };

  return { sync, saveConfig };
};

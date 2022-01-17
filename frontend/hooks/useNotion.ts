import { coreAPI } from "../core/coreAPI";
import { ConfigDTO } from "../core/domain";

export const useNotion = () => {
  const core = coreAPI();

  const sync = async () => {
    await core.notion
      .sync()
      .then(() => {
        core.toast.push(
          "노션 동기화를 시작했습니다. 이 작업은 시간이 걸립니다"
        );
      })
      .catch((e) => {
        core.toast.error(`노션 동기화에 실패하였습니다. ${e.message}`);
      });
  };

  const saveConfig = async (data: ConfigDTO[]): Promise<any> => {
    await core.notion
      .setKeyValue(data)
      .then((r) => {
        core.toast.push("데이터를 저장했습니다");
        core.notion.initVariables();
      })
      .catch(() => {
        core.toast.push(`데이터 저장에 실패했습니다`);
      });
  };

  const getConfigData = () => {
    return core.notion.getConfigData();
  };

  const activeStatus = () => {
    return core.notion.activeStatus();
  };

  return { sync, saveConfig, activeStatus, getConfigData };
};

import { InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { ConfigDTO } from "@blog/core/dist/infrastructure/repository";

import useConfig from "../../../../hooks/useConfig";
import { useToastContext } from "../../../../store/toastContext";
import { getHttpClient } from "../../../../core/httpClient";
import { useNotion } from "../../../../hooks/useNotion";

const Notion = ({ notionAPiKey, notionDatabaseId }) => {
  const configAPI = useConfig();
  const notionAPI = useNotion();
  const toastAPI = useToastContext();
  const router = useRouter();

  const [keys, setKeys] = useState({
    NOTION_API_KEY: "",
    NOTION_DATABASE_ID: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    setKeys((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    const body: ConfigDTO[] = Object.keys(keys).map((key) => ({
      key: key,
      value: keys[key],
    }));
    configAPI.setKeyValue(body).then((r) => {
      toastAPI.operation.push({
        title: "info",
        content: "데이터를 저장했습니다",
      });
      router.push("/admin/plugin/notion");
    });
  };

  const handleSync = async () => {
    setIsFetching(true);
    const result = await notionAPI.sync();
    setIsFetching(false);

    result &&
      toastAPI.operation.push({
        title: "info",
        content: "노션 데이터 동기화를 시작했습니다",
      });
  };

  return (
    <>
      <div className="flex flex-col px-2 w-full">
        <div className="w-full flex-col flex justify-center items-center border-2 rounded-xl py-4">
          <div className="w-5/6">
            <TextField
              fullWidth
              className="py-2"
              name="NOTION_API_KEY"
              type={isShowPassword ? "text" : "password"}
              defaultValue={notionAPiKey}
              label="notion API key"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <button onClick={() => setIsShowPassword((prev) => !prev)}>
                      <span className="material-icons-round">password</span>
                    </button>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              className="py-2"
              variant="outlined"
              name="NOTION_DATABASE_ID"
              type={isShowPassword ? "text" : "password"}
              label="database Id"
              defaultValue={notionDatabaseId}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <button onClick={() => setIsShowPassword((prev) => !prev)}>
                      <span className="material-icons-round">password</span>
                    </button>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="">
            <button
              onClick={handleClick}
              className={`w-full transition duration-500 ease-in-out bg-gray-600 text-gray-200 px-10 py-2 rounded-xl font-semibold ${
                !!Object.keys(keys)
                  .map((field) => !!keys[field])
                  .every((field) => field === true)
                  ? "opacity-100 h-10"
                  : "opacity-0 h-0 "
              } `}
            >
              save
            </button>
            <div className="py-4">
              <LoadingButton
                fullWidth
                onClick={handleSync}
                loading={isFetching}
                variant="outlined"
              >
                sync now
              </LoadingButton>
            </div>
            <div className="py-4">
              <button className="w-full bg-red-600 text-gray-200 px-10 py-2 rounded-xl text-xs ">
                disable plugin
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notion;

import { GetServerSideProps } from "next";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { InputAdornment, TextField } from "@mui/material";


import { coreAPI } from "../core/coreAPI";
import { useUser } from "../hooks/useUser";
import { UserDTO } from "../core/domain";

export const getServerSideProps: GetServerSideProps = async () => {
  const core = coreAPI();

  try {
    const getConfig = await core.config.getKeyValue("IS_DONE_BLOG_SETTING");
    if (getConfig) {
      return {
        redirect: {
          destination: "/",
          statusCode: 307,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    if (error?.status === 502) {
      return {
        redirect: {
          destination: "/502",
          statusCode: 307,
        },
      };
    }
    return {
      props: {},
    };
  }
};

const firstSetting = () => {
  const [keys, setKeys] = useState<UserDTO>({
    email: "",
    username: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    setKeys((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    await useUser().firstSetting(keys);
    setIsFetching(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="pb-32 flex flex-col">
          <span className="text-2xl text-gray-700 font-semibold pb-10">
            hi blog!
          </span>
          <span>처음 사용하기 위해서 사용자를 만들어주세요.</span>
        </div>
        <div className="w-5/6">
          <TextField
            fullWidth
            className="py-2"
            name="email"
            label="email"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            className="py-2"
            name="username"
            label="name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            className="py-2"
            variant="outlined"
            name="password"
            type={isShowPassword ? "text" : "password"}
            label="password"
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
          <div className="pt-10">
            <LoadingButton
              fullWidth
              onClick={handleSubmit}
              loading={isFetching}
              variant="outlined"
            >
              사용자 만들기
            </LoadingButton>
          </div>
        </div>
      </div>
    </>
  );
  return <></>;
};

export default firstSetting;

import { LoadingButton } from "@mui/lab";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

import { UserDTO } from "../core/domain";
import { useUser } from "../hooks/useUser";

const FirstSetting = () => {
  const [keys, setKeys] = useState<UserDTO>({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState<any>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    setKeys((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    try {
      await useUser().firstSetting(keys);
    } catch (error) {
      setError(() => error);
    }
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
          <div className="">
            {error?.length &&
              error.map((er, index) => (
                <div className="" key={index}>
                  {er}
                </div>
              ))}
          </div>
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
};

export default FirstSetting;

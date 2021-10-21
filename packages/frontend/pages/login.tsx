import { useEffect, useState } from "react";

import { UserLoginDTO } from "@blog/core/dist/domain";

import { useUser } from "../hooks/useUser";

const login = () => {
  const userAPI = useUser();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onClick = async () => {
    if (!id || !password) return;

    const requestUserInfo: UserLoginDTO = { email: id, password };
    await userAPI.login(requestUserInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center h-content">
      <div className="w-4/5">
        <div className="flex items-center w-full h-16 ">
          <span className="opacity-70 mr-4 material-icons-round">
            account_circle
          </span>
          <input
            onChange={(e) => setId(e.target.value)}
            type="text"
            className="w-full border-gray-600 focus:border-b focus:outline-none"
            placeholder="ID"
          />
        </div>
        <div className="font-semibold text-red-400">
          {/* {error?.message?.target === "id" && error.message.message} */}
        </div>
        <div className="flex items-center w-full h-16 ">
          <span className="opacity-70 mr-4 material-icons-round">vpn_key</span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border-gray-600 focus:border-b focus:outline-none"
            placeholder="password"
          />
        </div>
        <div className="font-semibold text-red-400">
          {/* {error?.message?.target === "password" && error.message.message} */}
        </div>
        <button
          onClick={onClick}
          className="flex justify-center w-full px-2 py-1 mt-10 font-semibold bg-gray-700 rounded-xl text-gray-50"
        >
          login
        </button>
      </div>
    </div>
  );
};

export default login;

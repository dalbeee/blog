import { useState } from "react";
import { UserLoginDTO } from "..";
import { useUserContext } from "../store/userContext";
import { useToastContext } from "../store/toastContext";

const login = () => {
  const { operation, error } = useUserContext();
  const { operation: toast } = useToastContext();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onClick = async () => {
    if (!id || !password) return;

    const requestUserInfo: UserLoginDTO = { email: id, password };
    const result = await operation.login(requestUserInfo);

    result
      ? toast.push({
          title: "알림",
          content: "로그인에 성공하였습니다",
        })
      : toast.push({
          title: "알림",
          content: "로그인에 실패하였습니다",
        });
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
          {error?.message?.target === "id" && error.message.message}
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
          {error?.message?.target === "password" && error.message.message}
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

import { FC } from "react";

const errorMessages = {
  400: ["잘못된 요청입니다"],
  401: ["권한이 없습니다", "로그인이 필요한 서비스입니다"],
  403: ["권한이 없습니다", "접근할 수 없는 페이지입니다."],
  404: ["존재하지 않는 페이지입니다."],
  409: ["중복된 요청입니다."],
  500: ["서버에서 오류가 발생했습니다."],
  502: ["서버에서 오류가 발생했습니다."],
  503: ["일시적으로 서버에 연결할 수 없습니다", "잠시 후 다시 시도해주세요."],
  504: ["서버에 연결할 수 없습니다."],
};

const ErrorPage: FC<{ status: number }> = ({ status }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-content">
        <span className="text-2xl text-gray-700 font-semibold pb-10">
          {status}
        </span>
        {errorMessages[status].map((message, index) => (
          <div className="py-2" key={index}>
            {message}
          </div>
        ))}
        {}
      </div>
    </>
  );
};

export default ErrorPage;

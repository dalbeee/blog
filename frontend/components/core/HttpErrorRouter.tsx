import Error from "next/error";
import { FC } from "react";

const HttpErrorRouter: FC<{ status?: number }> = ({ status, children }) => {
  if (status && status > 400) return <Error statusCode={status} />;
  return <>{children}</>;
};

export default HttpErrorRouter;

import { FC } from "react";

import ErrorPage from "./pages/ErrorPage";

const HttpErrorRouter: FC<{ status?: number }> = ({ status, children }) => {
  if (status && status > 400) return <ErrorPage status={status} />;

  return <>{children}</>;
};

export default HttpErrorRouter;

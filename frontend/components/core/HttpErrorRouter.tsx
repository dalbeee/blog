import React from "react";

import ErrorPage from "./pages/ErrorPage";

const HttpErrorRouter = ({
  status,
  children,
}: {
  status: number;
  children: React.ReactNode;
}) => {
  if (status && status > 400) return <ErrorPage status={status} />;

  return <>{children}</>;
};

export default HttpErrorRouter;

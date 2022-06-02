import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

import { HttpException } from "../../core/share/error";
import ErrorPage from "./pages/ErrorPage";

const FunctionalHttpErrorBoundary: FC<any> = ({ children }) => {
  const [error, setError] = useState<HttpException | null>(null);
  const router = useRouter();

  const handleRejectedPromise = useCallback((event: PromiseRejectionEvent) => {
    event.preventDefault();
    setError(event.reason);
  }, []);

  const resetError = () => {
    setError(null);
  };

  const handleAddEvents = useCallback(() => {
    window.addEventListener("unhandledrejection", handleRejectedPromise);
    router.events.on("routeChangeComplete", resetError);
  }, [handleRejectedPromise, router.events]);

  const handleRemoveEvents = useCallback(() => {
    window.removeEventListener("unhandledrejection", handleRejectedPromise);
    router.events.off("routeChangeComplete", resetError);
  }, [handleRejectedPromise, router.events]);

  useEffect(() => {
    handleAddEvents();
    return () => {
      handleRemoveEvents();
    };
  }, [handleAddEvents, handleRemoveEvents]);

  useEffect(() => {}, [error]);

  if (error instanceof HttpException)
    return <ErrorPage status={error.status} />;

  return <div>{children}</div>;
};

export default FunctionalHttpErrorBoundary;

import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SuspenseProvider: FC<any> = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
  };

  const handleComplete = () => {
    router.isReady && setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  if (loading) {
    return (
      <>
        <div className="relative flex justify-center w-full min-h-content">
          <div className="z-50 flex fixed h-screen w-full justify-center items-center">
            <CircularProgress />
          </div>
          <div className="opacity-30 backdrop-blur-xl items-center bg-white/30 blur-3xl">
            {children}
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default SuspenseProvider;

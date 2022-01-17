import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import SuspensePage from "../pages/SuspensePage";

const SuspenseProvider: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...args }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleStart = () => setLoading(true);

  const handleComplete = () => setLoading(false);

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
        <div {...args}>
          <div className="opacity-30 backdrop-blur-xl  bg-white/30 blur-3xl">
            {children}
          </div>
          <SuspensePage />
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default SuspenseProvider;

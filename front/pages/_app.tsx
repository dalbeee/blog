import Header from "../component/Header";
import "../styles/globals.css";
import Head from "next/head";

import { PostContextProvider } from "../store/postContext";
import { UserContextProvider } from "../store/userContext";
import { ToastProvider, useToastContext } from "../store/toastContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="//cdn.muicss.com/mui-0.10.3/css/mui.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <PostContextProvider>
        <UserContextProvider>
          <ToastProvider>
            <div className="flex justify-center">
              <div className="w-full sm:w-3/5 lg:w-2/5">
                <Header />
                <Component {...pageProps} />
              </div>
            </div>
          </ToastProvider>
        </UserContextProvider>
      </PostContextProvider>
    </>
  );
}

export default MyApp;

import Header from "../component/Header";
import "../styles/globals.css";
import Head from "next/head";

import { PostContextProvider } from "../store/postContext";
import { UserContextProvider } from "../store/userContext";
import { GetToastComponent, ToastProvider } from "../store/toastContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
      </Head>

      <ToastProvider>
        <UserContextProvider>
          <PostContextProvider>
            <div className="flex justify-center">
              <div className="w-full sm:w-3/5 lg:w-4/7">
                <Header />
                <Component {...pageProps} />
                <GetToastComponent />
              </div>
            </div>
          </PostContextProvider>
        </UserContextProvider>
      </ToastProvider>
    </>
  );
}

export default MyApp;

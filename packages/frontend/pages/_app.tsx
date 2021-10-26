import Header from "../components/Header";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
      </Head>

      <RecoilRoot>
        <div className="relative flex justify-center w-full min-h-content">
          <div className="w-full min-h-content sm:w-3/5 lg:w-4/7">
            <Header />
            <Component {...pageProps} />
          </div>
          <ToastContainer
            style={{ whiteSpace: "pre-line" }}
            position="bottom-right"
          />
        </div>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

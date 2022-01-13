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

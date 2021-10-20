import Header from "../component/Header";
import Head from "next/head";

import "../styles/globals.css";
import { GetToastComponent, ToastProvider } from "../store/toastContext";

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

      <ToastProvider>
        <div className="flex justify-center">
          <div className="w-full min-h-content sm:w-3/5 lg:w-4/7">
            <Header />
            <Component {...pageProps} />
            <GetToastComponent />
          </div>
        </div>
      </ToastProvider>
    </>
  );
}

export default MyApp;

import Header from "../components/Header";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import SuspenseProvider from "../components/core/providers/SuspenseProvider";
import FunctionalHttpErrorBoundary from "../components/core/FunctionalHttpErrorBoundary";
import HttpErrorRouter from "../components/core/HttpErrorRouter";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </Head>

      <div className="relative flex justify-center w-full min-h-content">
        <div className="flex flex-col w-full min-h-content sm:w-3/5 lg:w-4/7">
          <Header />
          <FunctionalHttpErrorBoundary>
            <HttpErrorRouter status={pageProps?.status}>
              <SuspenseProvider>
                <Component {...pageProps} />
              </SuspenseProvider>
            </HttpErrorRouter>
          </FunctionalHttpErrorBoundary>
        </div>
        <ToastContainer
          style={{ whiteSpace: "pre-line" }}
          position="bottom-right"
        />
      </div>
    </>
  );
}

export default MyApp;

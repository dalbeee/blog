import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import SuspenseProvider from "../common/providers/SuspenseProvider";
import FunctionalHttpErrorBoundary from "../common/components/FunctionalHttpErrorBoundary";
import HttpErrorRouter from "../common/components/HttpErrorRouter";
import Header from "../layout/components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
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

import Header from "../component/Header";
import "../styles/globals.css";
import Head from "next/head";

import { PostContextProvider } from "../store/postContext";
import { UserContextProvider } from "../store/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <PostContextProvider>
        <UserContextProvider>
          <div className="flex justify-center">
            <div className="w-full sm:w-3/5 lg:w-2/5">
              <Header />
              <Component {...pageProps} />
            </div>
          </div>
        </UserContextProvider>
      </PostContextProvider>
    </>
  );
}

export default MyApp;

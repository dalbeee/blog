import { isServerSide } from "./isServerSide";

export const resolveUrl = () => {
  return isServerSide()
    ? process.env.NEXT_PRIVATE_SSR_API_URL
    : process.env.NEXT_PUBLIC_CSR_API_URL;
};

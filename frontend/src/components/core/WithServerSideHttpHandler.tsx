import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { HttpException } from "../../core/share/error";

export const WithServerSideHttpHandler =
  (fn: GetServerSideProps): GetServerSideProps =>
  async (ctx: GetServerSidePropsContext) => {
    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof HttpException) {
        return { props: { status: error.status } };
      }
      throw new Error("unexpected error");
      return { props: {} };
    }
  };

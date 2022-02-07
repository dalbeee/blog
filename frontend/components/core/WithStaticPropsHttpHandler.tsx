import { GetStaticProps, GetStaticPropsContext } from "next";

import { HttpException } from "../../core/share/error";

export const WithGetStaticPropsHttpHandler =
  (fn: GetStaticProps): GetStaticProps =>
  async (ctx: GetStaticPropsContext) => {
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

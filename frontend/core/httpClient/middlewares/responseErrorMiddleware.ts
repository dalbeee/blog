import { AxiosInstance } from "axios";

import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "../../share/error";

export const responseErrorMiddleware = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      // if (!Axios.isAxiosError(error)) return;
      if (err.code === "ECONNREFUSED" || err.message === "Network Error")
        throw new ServiceUnavailableException(
          "connection error from http layer"
        );
      if (!err.response) throw new InternalServerErrorException();

      if (err?.response?.status === 400) throw new BadRequestException();
      if (err?.response?.status === 401) throw new UnauthorizedException();
      if (err?.response?.status === 403) throw new ForbiddenException();
      if (err?.response?.status === 404) throw new NotFoundException();
      if (err?.response?.status === 409) throw new ConflictException();
      if (err?.response?.status === 502) throw new BadGatewayException();
      if (err?.response?.status === 503)
        throw new ServiceUnavailableException();
      return Promise.reject(err);
    }
  );
};

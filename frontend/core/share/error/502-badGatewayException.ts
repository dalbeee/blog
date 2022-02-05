import { HttpException } from ".";

export class BadGatewayException extends HttpException {
  constructor(message = "Bad Gateway") {
    super(message, 502);
  }
}

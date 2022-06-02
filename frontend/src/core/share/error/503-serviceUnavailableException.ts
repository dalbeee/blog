import { HttpException } from ".";

export class ServiceUnavailableException extends HttpException {
  constructor(message = "Service Unavailable") {
    super(message, 503);
  }
}

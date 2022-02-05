import { HttpException } from ".";

export class BadRequestException extends HttpException {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

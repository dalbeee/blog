import { HttpException } from ".";

export class InternalServerErrorException extends HttpException {
  constructor(message: string = "Internal Server Error") {
    super(message, 500);
  }
}

export class HttpException extends Error {
  status: number;
  constructor(message: string = "http exception", status: number) {
    super(message);
    this.status = status;
  }
}

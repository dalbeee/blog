export interface HttpReturnType {
  response: {
    isError: boolean;
    message: string;
    status: number;
  };
}

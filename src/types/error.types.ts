export type IErrorResponse = {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
};

export type IError = {
  message: string;
  statusCode: number;
  status: string;
};

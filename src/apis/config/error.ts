import { ErrorCode } from './types';

export const SERVER_ERROR_STATUS = 500;
export const NETWORK_ERROR_STATUS = 5001;
export const UNHANDLED_ERROR_STATUS = 5002;

interface CustomErrorParams {
  errorCode: ErrorCode;
  status: number;
  message: string;
}

export class CustomError extends Error {
  errorCode: ErrorCode;
  status: number;
  message: string;

  constructor({ errorCode, status, message }: CustomErrorParams) {
    super();
    this.errorCode = errorCode;
    this.status = status;
    this.message = message;
  }
}

export class NetworkError extends Error {
  status = NETWORK_ERROR_STATUS;
  message = '네트워크가 불안정해요. 다시 시도해주세요!';
}

export class UnhandledError extends Error {
  status = UNHANDLED_ERROR_STATUS;
  message = '예기치 못한 에러가 발생했어요. 관리자에게 문의 바랍니다.';
}

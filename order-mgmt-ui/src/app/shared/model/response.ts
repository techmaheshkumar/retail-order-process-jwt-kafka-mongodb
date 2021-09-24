export interface Response<T> {
    status: number;
    message: string;
    result: T[];
  }

export interface ResponseSingle<T> {
    status: number;
    message: string;
    result: T;
  }

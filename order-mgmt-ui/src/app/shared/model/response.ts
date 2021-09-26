export interface Responses<T> {
  status: number;
  message: string;
  data: T[];
}

export interface Response<T> {
  status: number;
  message: string;
  data: T;
}

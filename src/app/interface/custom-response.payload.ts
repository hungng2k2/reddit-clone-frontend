export interface CustomResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

// 响应体
export interface ResOptions<T> {
  data: T;
  code: number;
  message: string;
}

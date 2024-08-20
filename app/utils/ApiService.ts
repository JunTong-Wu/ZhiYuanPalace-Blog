import qs from "qs";
import store from "@/store";
import NProgress from "nprogress";

interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
  stream: ReadableStream<Uint8Array>;
}
export type ResponseTypes = keyof ResponseMap | "json";

export interface RequestOptions {
  method?: any;
  query?: any;
  body?: any;
  responseType?: ResponseTypes;
  headers?: Record<string, any>;
  cache?: RequestCache;
  key?: string;
}

export interface ResOptions<T> {
  data?: T;
  code?: number;
  msg?: string;
}

const request = (url: string, options: RequestOptions): Promise<any> => {
  // 获取配置域名
  // @ts-ignore
  let baseUrl = import.meta.env.VITE_APP_API_BASE;
  // 拼接请求地址
  const reqUrl = baseUrl + url;
  let headers: Record<string, any> = {};
  headers["Cache-Control"] = "no-cache";
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  if (options.headers) {
    headers = Object.assign({}, headers, options.headers);
  }

  const key = `${reqUrl}${qs.stringify(options.query)}${qs.stringify(
    options.body
  )}`;

  return useLazyAsyncData(key, () =>
    $fetch(reqUrl, {
      method: options.method ?? "POST",
      query: options.query ?? null,
      body: options.body ?? null,
      responseType: options.responseType ?? "json",
      headers: headers,
      key: options.key,
      cache: options.cache,
      onRequest({ request, options }) {
        // 请求前操作
        if (process.client) {
          NProgress.start();
        }
      },
      onRequestError({ request, options, error }) {
        // 请求错误处理
        if (process.server) {
          const alertToClient = () => {
            const message = "无法连接到服务器";
            window.ZyToast({ title: message });
          };
          store
            .useQueueStore()
            .enqueue("onApiRequestError", alertToClient.toString());
        }
        if (process.client) {
          const message = "无法连接到服务器";
          window.ZyToast({ title: message });
        }
      },
      onResponse({ request, response, options }) {
        // 响应处理
        if (process.client) {
          NProgress.done();
        }
        if (response._data.code !== 0) {
          // 后端返回错误
          if (process.server) {
            const alertToClient = () => {
              const message = "数据库连接失败";
              window.ZyToast({ title: message });
            };
            store
              .useQueueStore()
              .enqueue("onApiResponse", alertToClient.toString());
          }
          if (process.client) {
            window.ZyToast({ title: response._data.message });
          }
        }
      },
      onResponseError({ request, response, options }) {
        // 响应错误处理
        if (process.client) {
          NProgress.done();
        }
      },
    })
  );
  //     .then(result => {
  //   // 添加 timeStamp
  //   return {
  //     ...result,
  //     [Date.now()]: Date.now(),
  //   };
  // })
};

export const ApiService = {
  get: (
    url: string,
    params: any,
    options: RequestOptions = {}
  ): Promise<any> => {
    return request(url, {
      method: "GET",
      query: params,
      ...options,
    });
  },
  post: (
    url: string,
    params: any,
    options: RequestOptions = {}
  ): Promise<any> => {
    return request(url, {
      body: qs.stringify(params),
      ...options,
    });
  },
};

/*
 * @Author: xiang.gao 57524479+GaoXiang0403@users.noreply.github.com
 * @Date: 2024-02-02 14:00:42
 * @LastEditors: xiang.gao 57524479+GaoXiang0403@users.noreply.github.com
 * @LastEditTime: 2024-02-19 10:20:07
 * @FilePath: /nuxt-sass/utils/client.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import qs from "qs";// 导入qs库，用于处理query
// import { getLang, getToken } from "../entity";

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
// 这里是规定后端返回的数据格式规范
export interface ResOptions<T> {
  data?: T;
  code?: number;
  msg?: string;
}
const request = (url: string, options: RequestOptions): Promise<any> => {
  // const config = useRuntimeConfig();
  // 获取配置域名
  // @ts-ignore
  let baseUrl = import.meta.env.VITE_APP_API_BASE;
  // 拼接请求地址
  const reqUrl = baseUrl + url;
  // const reqUrl = url;
  let headers: Record<string, any> = {};
  // const token = getToken(),
  //     lang = getLang();
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }
  // if (lang) {
  //   headers["X-LANG"] = lang;
  // }
  // headers: {
  //   'Cache-Control': 'no-cache',
  // },
  headers["Cache-Control"] = "no-cache";
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  if (options.headers) {
    headers = Object.assign({}, headers, options.headers);
  }
  return new Promise((resolve, reject) => {
    return $fetch(reqUrl, {
      method: options.method ?? "POST",
      query: options.query ?? null,
      body: options.body ?? null,
      responseType: options.responseType ?? "json",
      headers: headers,
      key: options.key,
      cache: options.cache,
      // credentials: "same-origin",
      // keepalive: true,
      // getCachedData(key: string) {
      //   console.log(key);
      //   // const nuxt = useNuxtApp();
      //   // console.log(
      //   //   nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key]
      //   // );
      // },
      onRequest({ request, options }) {
        // console.log("请求了", options);
        // Set the request headers
        //   options.headers = options.headers || {};
      },
      onRequestError({ request, options, error }) {
        // console.log("报错了", request);
        // ElMessage.closeAll();
        // error && ElMessage.error("Sorry, The Data Request Failed");
        // Handle the request errors
        reject(options);
      },
      onResponse({ request, response, options }) {
        // console.log("响应了", request);
        // Process the response data
        resolve(response._data);
        // refreshNuxtData([currentKey]);
        // return response._data;
      },
      onResponseError({ request, response, options }) {
        // console.log(
        //   "🚀 ~ file: MyRequest.ts:42 ~ onResponseError ~ request:",
        //   request
        // );
        // Handle the response errors
        reject(options);
      },
    });
    // .then(({ data, error }: any) => {
    //   const value: ResOptions<any> = data.value;
    //   resolve(value);
    //   // 判断是否有错误产生
    //   if (error.value) {
    //     doError(error.value?.statusCode, reqUrl);
    //     reject(error.value);
    //   } else {
    //     resolve(ref(value).value);
    //   }
    // })
    // .catch((err: any) => {
    //   // 接口请求异常的操作写在这里
    //   console.log(err);
    //   reject(err);
    // });
  });
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
  // put(url: string, body?: any): Promise<any> {
  //   return request(url, { method: "put", body });
  // },
  // delete(url: string, body?: any): Promise<any> {
  //   return request(url, { method: "delete", body });
  // },
};

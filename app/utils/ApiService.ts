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
import store from '@/store'

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
  return useLazyAsyncData(() => $fetch(reqUrl,{
    method: options.method ?? "POST",
    query: options.query ?? null,
    body: options.body ?? null,
    responseType: options.responseType ?? "json",
    headers: headers,
    key: options.key,
    cache: options.cache,
    onRequest({ request, options }) {
      // console.log("请求了", options);
    },
    onRequestError({ request, options, error }) {
      // console.log("报错了", request);
      if(process.server){
        const alertToClient = () => {
          const message = "无法连接到服务器";
          window.ZyAlert({ text: message })
        }
        store.useQueueStore().enqueue('onApiRequestError', alertToClient.toString())
      }
      if(process.client){
        const message = "无法连接到服务器";
        window.ZyAlert({ text: message })
      }

    },
    onResponse({ request, response, options }) {
      // console.log("响应了", response);
      if(response._data.code !== 0){
        // 后端返回错误信息
        if(process.server){
          const alertToClient = () => {
            const message = "数据库连接失败";
            window.ZyAlert({ text: message })
          }
          store.useQueueStore().enqueue('onApiResponse', alertToClient.toString())
        }
        if(process.client){
          window.ZyAlert({ text: response._data.message })
        }
      }
    },
    onResponseError({ request, response, options }) {
      // console.log("报错了", response);
    },
  }))
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

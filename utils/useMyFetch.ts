export const useMyFetch = function (
  method: string,
  url: string,
  parameter: any
) {
  const {
    data: res,
    pending,
    error,
    refresh,
  } = useLazyFetch(url, {
    onRequest({ request, options }) {
      options.method = method;
      options.baseURL = import.meta.env.VITE_APP_API_BASE;
      console.log('请求接口：' + options.baseURL + url);
      if (method == "get") {
        // 如果是get请求，把参数传到query
        // console.log('reqquery:', parameter);
        options.query = parameter;
      } else if (method == "post") {
        // 如果是get请求，把参数传到body
        // console.log('reqbody:', parameter);
        options.body = parameter;
      }
    },
    onRequestError({ request, options, error }) {
      console.log("请求错误", error);
    },
    onResponse({ request, response, options }) {
      if (response._data.code != 200) {
        // 查询失败
        // console.log(response._data);
        // showDialog({
        //   title: "来自服务器的信息",
        //   message: `Code：${response._data.code} Message：${response._data.message}`,
        // });
      }

      // console.log('返回数据：', response._data);
      return response._data;
    },
    onResponseError({ request, response, options }) {
      console.log("返回错误");
    },
  });
  return { res, pending, error, refresh };
};

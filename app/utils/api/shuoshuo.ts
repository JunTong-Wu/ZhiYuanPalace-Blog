import type { ShuoshuoListItem, ShuoshuoList } from "../models/post/shuoshuo";

export const ApiShuoShuo = {
  /**
   * 查询说说列表
   */
  getShuoshuoList(
    params: any
  ): Promise<LazyAsyncDataRef<ResOptions<ShuoshuoList>>> {
    return ApiService.post("/shuoshuo/index", params);
  },
  /**
   * 查询单条说说
   */
  showShuoshuo(
    params: any
  ): Promise<LazyAsyncDataRef<ResOptions<ShuoshuoListItem>>> {
    return ApiService.post(`/shuoshuo/show`, params);
  },
};

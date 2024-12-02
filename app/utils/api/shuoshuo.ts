import { shuoshuo } from "@@/models";

export const ShuoshuoModel = shuoshuo.Shuoshuo;
export const ShuoshuoListModel = shuoshuo.ShuoshuoList;

export type ShuoshuoModelType = shuoshuo.Shuoshuo;
export type ShuoshuoListModelType = shuoshuo.ShuoshuoList;
export type ApiIndexModelType = shuoshuo.ApiIndex;
export type ApiShowModelType = shuoshuo.ApiShow;

export const ApiShuoShuo = {
  /**
   * 查询说说列表
   */
  getShuoshuoList(
    params: ApiIndexModelType["params"] | null
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ShuoshuoListModelType>>> {
    return ApiService.post("/shuoshuo/index", params);
  },
  /**
   * 查询单条说说
   */
  showShuoshuo(
    params: ApiShowModelType["params"]
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ShuoshuoModelType>>> {
    return ApiService.post(`/shuoshuo/show`, params);
  },
};

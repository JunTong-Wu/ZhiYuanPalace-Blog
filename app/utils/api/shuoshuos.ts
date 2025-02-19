import { shuoshuo } from "@@/models";

type ShuoshuoModelType = shuoshuo.Shuoshuo;
type ShuoshuoListModelType = shuoshuo.ShuoshuoList;

type ApiIndexModelType = shuoshuo.ApiIndex;
type ApiShowModelType = shuoshuo.ApiShow;

export const ApiShuoShuo = {
  /**
   * 查询说说列表
   */
  getShuoshuoList(
    params: ApiIndexModelType["params"] | null
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ShuoshuoListModelType>>> {
    return ApiService.post("/shuoshuos/index", params);
  },
  /**
   * 查询单条说说
   */
  showShuoshuo(
    params: ApiShowModelType["params"]
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ShuoshuoModelType>>> {
    return ApiService.post(`/shuoshuos/show`, params);
  },
};

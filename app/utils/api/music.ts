import { music } from "@@/models";

type MusicListModelType = music.MusicList;
type ApiIndexModelType = music.ApiIndex;

export const ApiMusic = {
  /**
   * 查询音乐列表
   */
  getMusicList(
    params: ApiIndexModelType["params"] | null
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<MusicListModelType>>> {
    return ApiService.post("/music/index", params);
  },
};

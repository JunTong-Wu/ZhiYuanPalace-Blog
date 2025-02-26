import { video } from "@@/models";

type VideoModelType = video.Video;
type VideoListModelType = video.VideoList;

type ApiIndexModelType = video.ApiIndex;
type ApiShowModelType = video.ApiShow;

export const ApiVideo = {
  /**
   * 查询视频列表
   */
  getVideosList(
    params: ApiIndexModelType["params"] | null,
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<VideoListModelType>>> {
    return ApiService.post("/videos/index", params);
  },
  /**
   * 查询单篇视频
   */
  showVideo(
    params: ApiShowModelType["params"],
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<VideoModelType>>> {
    return ApiService.post(`/videos/show`, params);
  },
  /**
   * 视频密码验证
   */
  passwordVerify(
    params: any,
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<null>>> {
    return ApiService.post("/videos/password-verify", params);
  },
};

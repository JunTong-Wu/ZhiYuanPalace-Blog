import { video } from "@@/models";

export const VideoModel = video.Video;
export const VideoListModel = video.VideoList;

export type VideoModelType = video.Video;
export type VideoListModelType = video.VideoList;

type ApiIndexModelType = video.ApiIndex;
type ApiShowModelType = video.ApiShow;

export const ApiVideo = {
  /**
   * 查询视频列表
   */
  getVideosList(
    params: ApiIndexModelType["params"] | null
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<VideoListModelType>>> {
    return ApiService.post("/videos/index", params);
  },
  /**
   * 查询单篇视频
   */
  showVideo(
    params: ApiShowModelType["params"]
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<VideoModelType>>> {
    return ApiService.post(`/videos/show`, params);
  },
};

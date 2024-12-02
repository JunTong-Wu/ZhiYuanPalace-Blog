import { dashboard } from "@@/models";

export const PostsNumberModel = dashboard.PostsNumber;
export const OSInfoModel = dashboard.OSInfo;
export const DashboardModel = dashboard.Dashboard;

export type PostsNumberModelType = dashboard.PostsNumber;
export type OSInfoModelType = dashboard.OSInfo;
export type DashboardModelType = dashboard.Dashboard;

type ApiIndexModelType = dashboard.ApiIndex;

export const ApiDashboard = {
  getDashboardDetail(
    params: ApiIndexModelType["params"] | null
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<DashboardModelType>>> {
    return ApiService.post("/dashboard/index", params);
  },
};

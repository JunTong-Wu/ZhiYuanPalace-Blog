import { dashboard } from '@@/models';

const PostsNumberModel = dashboard.PostsNumber;
const OSInfoModel = dashboard.OSInfo;
const DashboardModel = dashboard.Dashboard;

type PostsNumberModelType = dashboard.PostsNumber;
type OSInfoModelType = dashboard.OSInfo;
type DashboardModelType = dashboard.Dashboard;

type ApiIndexModelType = dashboard.ApiIndex;

export const ApiDashboard = {
  getDashboardDetail(
    params: ApiIndexModelType['params'] | null,
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<DashboardModelType>>> {
    return ApiService.post('/dashboard/index', params);
  },
};

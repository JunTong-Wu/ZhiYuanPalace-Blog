<template>
  <CommonMainSection>
    <div>
      仪表盘
      <ZyFetchLoading
        :fetchData="dashboardLazyFetch"
        @fetchOnload="showDashboard"
      >
        <template #onload>
          {{ dashboardData }}
        </template>
      </ZyFetchLoading>
    </div>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { dashboard } from '@@/models';
  type DashboardModelType = dashboard.Dashboard;

  // 获取仪表盘列表
  const dashboardLazyFetch = await ApiDashboard.getDashboardDetail(null);
  const dashboardData = ref<DashboardModelType>(new dashboard.Dashboard());
  const showDashboard = (result: ResOptionsModelType<DashboardModelType>) => {
    dashboardData.value = result.data;
  };
</script>

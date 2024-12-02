<template>
  <CommonMainSection>
    <div>
      仪表盘
      <ZyFetchLoading :fetchData="dashboardLazyFetch" @fetchOnload="showDashboard">

        <template #onload>
          {{ dashboardData }}
        </template>
      </ZyFetchLoading>
    </div>
  </CommonMainSection>
</template>
<script setup lang="ts">
// 获取仪表盘列表
const dashboardLazyFetch = await ApiDashboard.getDashboardDetail(null);
const dashboardData = ref<DashboardModelType>(new DashboardModel());
const showDashboard = (result: ResOptionsModelType<DashboardModelType>) => {
  dashboardData.value = result.data;
};
</script>

<template>
  <CommonMainSection>
    <div>
      <ZyFetchLoading
        :fetchData="dashboardLazyFetch"
        @fetchOnload="showDashboard"
      >
        <template #loading>
          <div class="row-dashboard">
            <UCard
              v-for="n in 4"
              class="clo-dashboard"
            >
              <template #header>
                <ZySkeleton :row="1" />
              </template>
              <div
                v-loading="true"
                class="h-64 w-full"
              ></div>
            </UCard>
          </div>
        </template>
        <template #onload>
          <ClientOnly>
            <div class="row-dashboard">
              <!-- 饼图：帖子类型分布 -->
              <UCard class="clo-dashboard">
                <template #header>
                  <h3>帖子类型分布</h3>
                </template>

                <v-chart
                  class="h-64 w-full"
                  :option="postOption"
                />
              </UCard>

              <!-- 仪表盘：CPU 使用率 -->
              <UCard class="clo-dashboard">
                <template #header>
                  <h3>CPU 使用率</h3>
                </template>

                <v-chart
                  class="h-64 w-full"
                  :option="cpuUsageOption"
                />
              </UCard>

              <!-- 仪表盘：内存使用率 -->
              <UCard class="clo-dashboard">
                <template #header>
                  <h3>内存使用率</h3>
                </template>

                <v-chart
                  class="h-64 w-full"
                  :option="memoryUsageOption"
                />
              </UCard>

              <!-- 系统信息 -->
              <UCard class="info-container clo-dashboard">
                <template #header>
                  <h3>系统信息</h3>
                </template>

                <ul>
                  <li>系统版本：{{ dashboardData.os_info.sys_version }}</li>
                  <li>CPU 平台：{{ dashboardData.os_info.cpu_platform }}</li>
                  <li>CPU 架构：{{ dashboardData.os_info.cpu_arch }}</li>
                  <li>CPU 核心数：{{ dashboardData.os_info.cpu_count }}</li>
                  <li>CPU 型号：{{ dashboardData.os_info.cpu_model }}</li>
                  <li>CPU 速度：{{ dashboardData.os_info.cpu_speed }} MHz</li>
                  <li>
                    系统运行时间：{{
                      formatUptime(dashboardData.os_info.sys_uptime)
                    }}
                  </li>
                </ul>
              </UCard>
            </div>
          </ClientOnly>
        </template>
      </ZyFetchLoading>
    </div>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { dashboard } from "@@/models";

  type DashboardModelType = dashboard.Dashboard;

  // 获取仪表盘列表
  const dashboardLazyFetch = await ApiDashboard.getDashboardDetail(null);
  const dashboardData = ref<DashboardModelType>(new dashboard.Dashboard());
  const showDashboard = (result: ResOptionsModelType<DashboardModelType>) => {
    dashboardData.value = result.data;
  };

  // 饼图配置：帖子类型分布
  const postOption = computed(() => ({
    title: {
      show: false,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0%",
      left: "center",
      textStyle: {
        color: "inherit",
      },
    },
    series: [
      {
        name: "帖子类型",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: dashboardData.value.posts_number.article, name: "文章" },
          { value: dashboardData.value.posts_number.shuoshuo, name: "说说" },
          { value: dashboardData.value.posts_number.video, name: "视频" },
          { value: dashboardData.value.posts_number.photo, name: "图片" },
        ],
      },
    ],
  }));

  // 仪表盘配置：CPU 使用率
  const cpuUsageOption = computed(() => ({
    series: [
      {
        name: "CPU 使用率",
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 12,
        itemStyle: {
          color: "#58D9F9",
          shadowColor: "rgba(0,138,255,0.45)",
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 18,
        },
        pointer: {
          icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
          length: "75%",
          width: 16,
          offsetCenter: [0, "5%"],
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          width: "60%",
          lineHeight: 40,
          height: 40,
          borderRadius: 8,
          offsetCenter: [0, "70%"],
          valueAnimation: true,
          formatter: function (value) {
            return "{value|" + value + "%}";
          },
          rich: {
            value: {
              fontSize: 30,
              fontWeight: "bolder",
              color: "#9ca3af",
            },
          },
        },
        data: [
          {
            value: Number(dashboardData.value.os_info.cpu_use * 100).toFixed(2),
            name: "CPU 使用率",
          },
        ],
      },
    ],
  }));

  // 仪表盘配置：内存使用率
  const memoryUsageOption = computed(() => ({
    series: [
      {
        name: "内存使用率",
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 12,
        itemStyle: {
          color: "#58D9F9",
          shadowColor: "rgba(0,138,255,0.45)",
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 18,
        },
        pointer: {
          icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
          length: "75%",
          width: 16,
          offsetCenter: [0, "5%"],
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          width: "60%",
          lineHeight: 40,
          height: 40,
          borderRadius: 8,
          offsetCenter: [0, "70%"],
          valueAnimation: true,
          formatter: function (value) {
            return "{value|" + value + "%}";
          },
          rich: {
            value: {
              fontSize: 30,
              fontWeight: "bolder",
              color: "#9ca3af",
            },
          },
        },
        data: [
          {
            value: Number(
              ((dashboardData.value.os_info.ram_totalmem -
                dashboardData.value.os_info.ram_freemem) /
                dashboardData.value.os_info.ram_totalmem) *
                100,
            ).toFixed(2),
            name: "内存使用率",
          },
        ],
      },
    ],
  }));

  // 格式化系统运行时间
  function formatUptime(uptime: number) {
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
  }
</script>

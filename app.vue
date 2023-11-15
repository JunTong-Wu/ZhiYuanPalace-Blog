<template>
  <ZySuperResponsive
    :base-font-size="baseFontSize"
    :break-points="breakPoints"
    :design-size="designSize"
  >
    <NuxtLayout>
      <ZySlideRouterView :path-list="pathList">
        <NuxtPage />
      </ZySlideRouterView>
      <!-- <ZyScrollView><NuxtPage /></ZyScrollView> -->
    </NuxtLayout>
  </ZySuperResponsive>
</template>
<script setup lang="ts">
const baseFontSize = 18;
const breakPoints = {
  xs: 600,
  sm: 900,
  md: 1200,
  lg: 1500,
  xl: 1800,
};
const designSize = {
  min_xs_v: 375, //手机竖屏
  min_xs_h: 812, //手机横屏
  xs_sm_v: 576, //小平板竖屏
  xs_sm_h: 1024, //小平板横屏
  sm_md_v: 720, //大平板竖屏
  sm_md_h: 1280, //大平板横屏
  md_lg_v: 768, //小笔记本竖屏
  md_lg_h: 1366, //小笔记本横屏
  lg_xl_v: 900, //大笔记本竖屏
  lg_xl_h: 1600, //大笔记本横屏
  xl_max_v: 1080, //显示器竖屏
  xl_max_h: 1920, //显示器横屏
};
const pathList = ["/", "/text", "/multi-media"];
</script>

<template>
  <slot />
</template>
<script lang="ts" setup>
  import { onMounted } from "vue";
  import { useHead } from "nuxt/app";

  // 使用类型断言来处理 TypeScript 的类型检查
  declare global {
    interface Window {
      isDarkMode: boolean;
      ZyDesignSize: {
        min_xs_v: number;
        min_xs_h: number;
        xs_sm_v: number;
        xs_sm_h: number;
        sm_md_v: number;
        sm_md_h: number;
        md_lg_v: number;
        md_lg_h: number;
        lg_xl_v: number;
        lg_xl_h: number;
        xl_max_v: number;
        xl_max_h: number;
      };
      ZyBreakPoints: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      ZyFontSize: number;
    }
  }

  const props = defineProps({
    baseFontSize: {
      type: Number,
      default: 16,
    },
    breakPoints: {
      default: () => ({
        xs: 600,
        sm: 900,
        md: 1200,
        lg: 1500,
        xl: 1800,
      }),
    },
    designSize: {
      default: () => ({
        min_xs_v: 375, //手机竖屏
        min_xs_h: 667, //手机横屏
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
      }),
    },
  });

  // SSR引入标签
  useHead({
    script: [
      {
        innerHTML: `
        window.ZyFontSize = ${props.baseFontSize};
        window.ZyBreakPoints = ${JSON.stringify(props.breakPoints)};
        window.ZyDesignSize = ${JSON.stringify(props.designSize)}
      `,
      },
      {
        innerHTML: `${initZySuperResponsive.toString()};initZySuperResponsive();`,
      },
    ],
  });

  // 初始化
  function initZySuperResponsive() {
    const isMobile = () => {
      const mql = window.matchMedia("(pointer: coarse)");
      return mql.matches;
    };

    const isDarkMode = () => {
      const isDarktheme = window.matchMedia("(prefers-color-scheme: dark)");
      return isDarktheme.matches;
    };

    const isVertical = () => {
      const mql = window.matchMedia("(orientation: portrait)");
      return mql.matches;
    };

    const classListInit = () => {
      if (isMobile()) {
        document.documentElement.classList.remove("pc");
        document.documentElement.classList.add("mobile");
      } else {
        document.documentElement.classList.remove("mobile");
        document.documentElement.classList.add("pc");
      }
      if (isDarkMode()) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    classListInit();

    const ssrBuryingPoint = () => {
      if (isDarkMode()) {
        window.isDarkMode = true;
      }
    };
    ssrBuryingPoint();

    const classListChange = () => {
      if (isMobile()) {
        document.documentElement.classList.remove("pc");
        document.documentElement.classList.add("mobile");
      } else {
        document.documentElement.classList.remove("mobile");
        document.documentElement.classList.add("pc");
      }
    };

    const fontSizeInit = () => {
      const docEl = document.documentElement;
      const fontSize = window.ZyFontSize;
      const breakPoints = window.ZyBreakPoints;
      const designSize = window.ZyDesignSize;

      if (docEl) {
        const width = docEl.clientWidth;
        const isVert = isVertical();

        // 定义尺寸映射对象
        const sizeMap = {
          xs: isVert ? designSize.min_xs_v : designSize.min_xs_h,
          sm: isVert ? designSize.xs_sm_v : designSize.xs_sm_h,
          md: isVert ? designSize.sm_md_v : designSize.sm_md_h,
          lg: isVert ? designSize.md_lg_v : designSize.md_lg_h,
          xl: isVert ? designSize.lg_xl_v : designSize.lg_xl_h,
          max: isVert ? designSize.xl_max_v : designSize.xl_max_h,
        };

        let rem;
        if (width <= breakPoints.xs) {
          rem = fontSize * (width / sizeMap.xs);
        } else if (width <= breakPoints.sm) {
          rem = fontSize * (width / sizeMap.sm);
        } else if (width <= breakPoints.md) {
          rem = fontSize * (width / sizeMap.md);
        } else if (width <= breakPoints.lg) {
          rem = fontSize * (width / sizeMap.lg);
        } else if (width <= breakPoints.xl) {
          rem = fontSize * (width / sizeMap.xl);
        } else {
          rem = fontSize * (width / sizeMap.max);
        }

        docEl.style.fontSize = rem + "px";
      }
    };
    fontSizeInit();

    // 监听浏览器窗口变化
    window.addEventListener("resize", () => {
      fontSizeInit();
      setTimeout(() => {
        classListChange();
      }, 20);
    });
  }

  // 阻止vivo浏览器手势
  let startX: number, startY: number;
  onMounted(() => {
    window.addEventListener("touchstart", (e) => {
      if (e.targetTouches[0]) {
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
      }
    });
    window.addEventListener("touchmove", (e) => {
      if (e.targetTouches[0]) {
        const moveX = e.targetTouches[0].pageX;
        const moveY = e.targetTouches[0].pageY;
        if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
          e.cancelable && e.preventDefault();
        }
      }
    });
  });
</script>

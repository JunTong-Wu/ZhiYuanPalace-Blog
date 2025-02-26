<template>
  <slot />
</template>
<script lang="ts">
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
  export default defineComponent({
    name: "ZySuperResponsive",
    props: {
      baseFontSize: {
        type: Number,
        default: 14,
      },
      breakPoints: {
        default: {
          xs: 600,
          sm: 900,
          md: 1200,
          lg: 1500,
          xl: 1800,
        },
      },
      designSize: {
        default: {
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
        },
      },
    },
    setup(props) {
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
          if (mql.matches) {
            return true;
          } else {
            return false;
          }
        };
        const isDarkMode = () => {
          const isDarktheme = window.matchMedia("(prefers-color-scheme: dark)");
          if (isDarktheme.matches) {
            return true;
          } else {
            return false;
            // let currdate = new Date();
            // if (currdate.getHours() >= 19 || currdate.getHours() < 7) {
            //   return true;
            // } else {
            //   return false;
            // }
          }
        };
        const isVertical = () => {
          const mql = window.matchMedia("(orientation: portrait)");
          if (mql.matches) {
            return true;
          } else {
            return false;
          }
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
            let rem;
            if (docEl.clientWidth <= breakPoints.xs) {
              if (isVertical()) {
                rem = fontSize * (docEl.clientWidth / designSize.min_xs_v);
              } else {
                rem = fontSize * (docEl.clientWidth / designSize.min_xs_h);
              }
            } else if (
              breakPoints.xs < docEl.clientWidth &&
              docEl.clientWidth <= breakPoints.sm
            ) {
              if (isVertical()) {
                rem = fontSize * (docEl.clientWidth / designSize.xs_sm_v);
              } else {
                rem = fontSize * (docEl.clientWidth / designSize.xs_sm_h);
              }
            } else if (
              breakPoints.sm < docEl.clientWidth &&
              docEl.clientWidth <= breakPoints.md
            ) {
              if (isVertical()) {
                rem = fontSize * (docEl.clientWidth / designSize.sm_md_v);
              } else {
                rem = fontSize * (docEl.clientWidth / designSize.sm_md_h);
              }
            } else if (
              breakPoints.md < docEl.clientWidth &&
              docEl.clientWidth <= breakPoints.lg
            ) {
              if (isVertical()) {
                rem = fontSize * (docEl.clientWidth / designSize.md_lg_v);
              } else {
                rem = fontSize * (docEl.clientWidth / designSize.md_lg_h);
              }
            } else if (
              breakPoints.lg < docEl.clientWidth &&
              docEl.clientWidth <= breakPoints.xl
            ) {
              if (isVertical()) {
                rem = fontSize * (docEl.clientWidth / designSize.lg_xl_v);
              } else {
                rem = fontSize * (docEl.clientWidth / designSize.lg_xl_h);
              }
            } else if (breakPoints.xl < docEl.clientWidth) {
              if (isVertical()) {
                rem = fontSize * (docEl.clientWidth / designSize.xl_max_v);
              } else {
                rem = fontSize * (docEl.clientWidth / designSize.xl_max_h);
              }
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
    },
  });
</script>

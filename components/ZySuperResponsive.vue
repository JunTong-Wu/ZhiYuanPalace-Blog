<template>
  <slot />
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-super-responsive",
  props: {
    baseFontSize: {
      type: Number,
      default: 16,
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
        var mql = window.matchMedia("(pointer: coarse)");
        if (mql.matches) {
          return true;
        } else {
          return false;
        }
      };
      const isDarkmode = () => {
        const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (isDarkTheme.matches) {
          return true;
        } else {
          let currdate = new Date();
          if (currdate.getHours() >= 19 || currdate.getHours() < 7) {
            return true;
          } else {
            return false;
          }
        }
      };
      const isVertical = () => {
        var mql = window.matchMedia("(orientation: portrait)");
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
        if (isDarkmode()) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };

      classListInit();

      const ssrBuryingPoint = () => {
        if (isDarkmode()) {
          (window as any).isDarkmode = true;
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
        var docEl = document.documentElement;
        const fontSize = (window as any).ZyFontSize;
        const breakPoints = (window as any).ZyBreakPoints;
        const designSize = (window as any).ZyDesignSize;
        if (docEl) {
          var rem;
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
    var startX: number, startY: number;
    onMounted(() => {
      window.addEventListener("touchstart", (e) => {
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
      });
      window.addEventListener("touchmove", (e) => {
        var moveX = e.targetTouches[0].pageX;
        var moveY = e.targetTouches[0].pageY;
        if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
          e.cancelable && e.preventDefault();
        }
      });
    });
  },
});
</script>
<style lang="scss">
:root {
  background: var(--bg-1);
  color: var(--text-1);
}

.vertical-layout {
  display: none;
}
.horizontal-layout {
  display: none;
}

@media (orientation: landscape) {
  /* 横屏 */
  .horizontal-layout {
    display: block;
  }
}
@media (orientation: portrait) {
  /* 竖屏 */
  .vertical-layout {
    display: block;
  }
}
@media (pointer: fine) {
  /* 使用鼠标或手写笔 */
}
@media (pointer: coarse) {
  /* 使用触摸屏 */
}
@media (hover: hover) {
  /* 可以hover */
}
@media (hover: none) {
  /* 不可以hover */
}
</style>

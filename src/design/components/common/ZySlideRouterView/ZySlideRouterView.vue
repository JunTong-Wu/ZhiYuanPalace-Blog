<template>
  <div un-w="full" un-overflow="hidden">
    <ZyTouch
      id="zy-slide-router__root"
      @slidingLeft="renderRightView"
      @slidingRight="renderLeftView"
      @slideEndLeft="goRightView"
      @slideEndRight="goLeftView"
      @slideCancelLeft="goRightView"
      @slideCancelRight="goLeftView"
    >
      <div :key="transitionKey" id="zy-slide-router__now">
        <slot />
      </div>
    </ZyTouch>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  props: {
    pathList: {
      type: Array<string>,
      default: <Array<string>>[],
    },
  },
  setup(props, ctx) {
    const route = useRoute();
    const router = useRouter();
    const transitionKey = ref(0);
    const holdPress = ref(false); // 是否正在按住
    let nowPathIndex; // 当前路由索引
    let leftPath; // 前一个路由
    let rightPath; // 后一个路由

    /*
     * 交互接收
     */
    const renderLeftView = (val: any) => {
      if (!holdPress.value) {
        getLeftView();
      }
      holdPress.value = true;
      translateX(`${0 - val.moveDistanceX}px`);
    };
    const renderRightView = (val: any) => {
      if (!holdPress.value) {
        getRightView();
      }
      holdPress.value = true;
      translateX(`${0 - val.moveDistanceX}px`);
    };
    const goLeftView = (val: any) => {
      holdPress.value = false;
      translateX(`100%`);
    };
    const goRightView = (val: any) => {
      holdPress.value = false;
      translateX(`-100%`);
    };

    /*
     * 过渡效果实现
     */
    function translateX(translateX: string) {
      // console.log(`translateX:${translateX}`);
      const temp = document.getElementById("zy-slide-router__now");
      const old = document.getElementById("zy-slide-router__old");
      if (temp && old) {
        if (old.classList.contains("left")) {
          old.style.transform = `translateX(${translateX})`;
          temp.style.transform = `translateX(calc(100% + ${translateX}))`;
        } else if (old.classList.contains("right")) {
          old.style.transform = `translateX(${translateX})`;
          temp.style.transform = `translateX(calc(0px - 100% + ${translateX}))`;
        }
        if (!holdPress.value) {
          old.style.transition = `transform 400ms`;
          temp.style.transition = `transform 400ms`;
        }
      }
    }

    /*
     * 调用路由
     */
    function hasPathList() {
      if (props.pathList.length) {
        return true;
      } else {
        return false;
      }
    }
    function getLeftView() {
      if (hasPathList()) {
        nowPathIndex = props.pathList.findIndex((item) => {
          return item == route.path;
        });
        leftPath = props.pathList[nowPathIndex - 1];
        if (leftPath) {
          router.replace({ path: leftPath });
        }
      } else {
        nowPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == route.path;
        });
        leftPath = router.getRoutes()[nowPathIndex - 1];
        if (leftPath) {
          router.replace(leftPath);
        }
      }
    }
    function getRightView() {
      if (hasPathList()) {
        nowPathIndex = props.pathList.findIndex((item) => {
          return item == route.path;
        });
        rightPath = props.pathList[nowPathIndex + 1];
        if (rightPath) {
          router.replace({ path: rightPath });
        }
      } else {
        nowPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == route.path;
        });
        rightPath = router.getRoutes()[nowPathIndex + 1];
        if (rightPath) {
          router.replace(rightPath);
        }
      }
    }
    // 拷贝上一个页面
    const copyOldPage = (position: string, callback: any) => {
      const root = document.getElementById("zy-slide-router__root");
      const lastOld = document.getElementById("zy-slide-router__old");
      // 防抖，防止同时存在两个old页面
      if (root && lastOld) {
        root.removeChild(lastOld);
      }
      const old = document.createElement("div");
      old.id = "zy-slide-router__old";

      const temp = document.getElementById("zy-slide-router__now");
      if (temp && root) {
        let oldPage = document.createElement("div");
        oldPage.appendChild(temp.getElementsByTagName("div")[0]);
        old.innerHTML = "";
        old.appendChild(oldPage);
        if (position == "right") {
          // 旧页面在左边
          old.classList.add("left");
          root.insertBefore(old, temp);
        } else if (position == "left") {
          // 旧页面在右边
          old.classList.add("right");
          root.appendChild(old);
        }
      }
      callback();
    };
    // 清除上一个页面
    const clearOldPage = () => {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const root = document.getElementById("zy-slide-router__root");
        const old = document.getElementById("zy-slide-router__old");
        if (root && old) {
          root.removeChild(old);
          const temp = document.getElementById("zy-slide-router__now");
          if (temp) {
            temp.style.transform = `translateX(0px)`;
            temp.style.transition = `transform 400ms`;
          }
        }
      }, 400);
    };
    watch(holdPress, (newValue) => {
      if (!newValue) {
        clearOldPage();
      }
    });
    // 全局导航守卫
    router.beforeEach((to, from, next) => {
      transitionKey.value = new Date().getTime();
      let toPathIndex = 0;
      let fromPathIndex = 0;
      if (hasPathList()) {
        toPathIndex = props.pathList.findIndex((item) => {
          return item == to.path;
        });
        fromPathIndex = props.pathList.findIndex((item) => {
          return item == from.path;
        });
      } else {
        toPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == to.path;
        });
        fromPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == from.path;
        });
      }
      if (toPathIndex > fromPathIndex) {
        copyOldPage("right", next);
      } else {
        copyOldPage("left", next);
      }
    });
    router.afterEach((to, from) => {
      if (!holdPress.value) {
        clearOldPage();
      }
    });

    return {
      transitionKey,
      holdPress,
      renderLeftView,
      renderRightView,
      goLeftView,
      goRightView,
    };
  },
});
</script>
<style lang="scss">
#zy-slide-router__root {
  width: 100%;
  position: relative;
  > div {
    width: 100%;
    &#zy-slide-router__old {
      &.left {
        position: absolute;
        left: 0;
        top: 0;
      }
      &.right {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>

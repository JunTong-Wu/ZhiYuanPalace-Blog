<template>
  <div un-w="full" un-overflow="hidden">
    <ZyTouch
      id="zy-slide-router__root"
      @slidingLeft=""
      @slidingRight=""
      @slideEndLeft=""
      @slideEndRight=""
    >
      <div id="zy-slide-router__old"></div>
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

    /*
     * 切换路由
     */
    let nowPathIndex; // 当前路由索引
    let prevPath; // 前一个路由
    let nextPath; // 后一个路由
    function hasPathList() {
      if (props.pathList.length) {
        return true;
      } else {
        return false;
      }
    }
    function Prev() {
      if (hasPathList()) {
        nowPathIndex = props.pathList.findIndex((item) => {
          return item == route.path;
        });
        prevPath = props.pathList[nowPathIndex - 1];
        if (prevPath) {
          router.replace({ path: prevPath });
        }
      } else {
        nowPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == route.path;
        });
        prevPath = router.getRoutes()[nowPathIndex - 1];
        if (prevPath) {
          router.replace(prevPath);
        }
      }
    }
    function Next() {
      if (hasPathList()) {
        nowPathIndex = props.pathList.findIndex((item) => {
          return item == route.path;
        });
        nextPath = props.pathList[nowPathIndex + 1];
        if (nextPath) {
          router.replace({ path: nextPath });
        }
      } else {
        nowPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == route.path;
        });
        nextPath = router.getRoutes()[nowPathIndex + 1];
        if (nextPath) {
          router.replace(nextPath);
        }
      }
    }

    /*
     * 过渡实现方法
     */

    // 添加样式
    function addClass(to: any, from: any) {
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
        const root = document.getElementById("zy-slide-router__root");
        if (root) {
          root.classList.add("zy-slide-router-enter-right");
        }
      } else {
        const root = document.getElementById("zy-slide-router__root");
        if (root) {
          root.classList.add("zy-slide-router-enter-left");
        }
      }
    }
    // 移除样式
    function removeClass(to: any, from: any) {
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
        const root = document.getElementById("zy-slide-router__root");
        if (root) {
          root.classList.remove("zy-slide-router-enter-right");
        }
      } else {
        const root = document.getElementById("zy-slide-router__root");
        if (root) {
          root.classList.remove("zy-slide-router-enter-left");
        }
      }
    }
    // 拷贝上一个页面
    function copyOldPage(to: any, from: any, callback: any) {
      const temp = document.getElementById("zy-slide-router__now");
      const old = document.getElementById("zy-slide-router__old");
      if (temp && old) {
        let oldPage = document.createElement("div");
        oldPage.appendChild(temp.getElementsByTagName("div")[0]);
        old.innerHTML = "";
        old.appendChild(oldPage);
      }
      addClass(to, from);
      callback();
    }
    // 清除上一个页面
    function clearOldPage(to: any, from: any) {
      removeClass(to, from);
      const old = document.getElementById("zy-slide-router__old");
      if (old) {
        old.innerHTML = "";
      }
    }

    /* 全局导航守卫  */
    router.beforeEach((to, from, next) => {
      transitionKey.value = new Date().getTime();
      copyOldPage(to, from, next);
    });
    router.beforeResolve(async (to) => {
      // return false;
    });
    router.afterEach((to, from) => {
      setTimeout(() => {
        clearOldPage(to, from);
      }, 400);
    });

    return {
      transitionKey,
    };
  },
});
</script>
<style lang="scss">
@keyframes slideleft {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes slideright {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
#zy-slide-router__root {
  display: flex;
  overflow: hidden;
  width: 100%;
  cursor: grab;

  #zy-slide-router__old {
    order: 0;
    width: 0;
    display: none;
  }
  #zy-slide-router__now {
    width: 100%;
  }

  &.zy-slide-router-enter-left {
    width: 200%;
    animation: slideleft 400ms forwards;

    #zy-slide-router__old {
      order: 1;
      width: 50%;
      display: block;
    }
    #zy-slide-router__now {
      width: 50%;
    }
  }
  &.zy-slide-router-enter-right {
    width: 200%;
    animation: slideright 400ms forwards;

    #zy-slide-router__old {
      order: 0;
      width: 50%;
      display: block;
    }
    #zy-slide-router__now {
      width: 50%;
    }
  }
}
</style>

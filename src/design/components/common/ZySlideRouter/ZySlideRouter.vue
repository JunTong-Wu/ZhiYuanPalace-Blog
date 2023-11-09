<template>
  <div un-w="full" un-overflow="hidden">
    <div
      id="zy-slide-router__root"
      @mousedown.prevent="onDrawerMouseDown($event)"
      @mousemove.prevent="onDrawerMouseMove($event)"
      @mouseup.prevent="onDrawerMouseUp($event)"
      @touchstart="onDrawerTouchStart($event)"
      @touchmove.prevent="onDrawerTouchMove($event)"
      @touchend="onDrawerTouchEnd($event)"
    >
      <div id="zy-slide-router__old"></div>
      <div :key="transitionKey" id="zy-slide-router__now">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const transitionKey = ref(0);
const transitionFlag = ref(false);

let startX = 0; // 触摸开始X轴位置
let startY = 0; // 触摸开始Y轴位置
let endX = 0; // 触摸结束X轴位置
let endY = 0; // 触摸结束Y轴位置
let moveDistanceX = 0; // 触摸移动X轴距离
let moveDistanceY = 0; // 触摸移动Y轴距离
let mouseDown = false; //定义一个变量判断是否执行移动函数

function onDrawerMouseDown(e: MouseEvent) {
  // console.log("MouseDown:", e.clientX, e.clientY);
  startX = e.clientX;
  startY = e.clientY;
  mouseDown = true;
}
// 鼠标移动
function onDrawerMouseMove(e: MouseEvent) {
  if (mouseDown == true) {
    endX = e.clientX;
    endY = e.clientY;
    moveDistanceX = startX - endX;
    moveDistanceY = startY - endY;
    // console.log("MouseMove:", moveDistanceX, moveDistanceY);
    startTranslateByMove();
  }
}
// 鼠标松开
function onDrawerMouseUp(e: MouseEvent) {
  // console.log("MouseUp");
  mouseDown = false;
  stopTranslateByMove();
  moveDistanceX = 0;
  moveDistanceY = 0;
}
// 触屏按住
function onDrawerTouchStart(e: TouchEvent) {
  // console.log("TouchStart:", e.touches[0].clientX, e.touches[0].clientY);
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}
// 触屏拖动
function onDrawerTouchMove(e: TouchEvent) {
  endX = e.changedTouches[0].clientX;
  endY = e.changedTouches[0].clientY;
  moveDistanceX = startX - endX;
  moveDistanceY = startY - endY;
  // console.log("TouchMove:", moveDistanceX, moveDistanceY);
  startTranslateByMove();
}
// 触屏离开
function onDrawerTouchEnd(e: TouchEvent) {
  // console.log("TouchEnd");
  stopTranslateByMove();
  moveDistanceX = 0;
  moveDistanceY = 0;
}
// 修改正在拖动时的样式
function startTranslateByMove() {
  // 判断滑动距离超过40
  if (Math.abs(moveDistanceX) > 40) {
    if (moveDistanceX > 0) {
      if (!transitionFlag.value) {
        Next();
      }
      transitionFlag.value = true;
    } else {
      if (!transitionFlag.value) {
        Prev();
      }
      transitionFlag.value = true;
    }
  }
}
// 修改释放拖动时的样式
function stopTranslateByMove() {
  transitionFlag.value = false;
}

/*
 * 切换路由
 */

function Prev() {
  const nowPathIndex = router.getRoutes().findIndex((item) => {
    return item.path == route.path;
  });
  const prevPath = router.getRoutes()[nowPathIndex - 1];
  if (prevPath) {
    router.replace(prevPath);
  }
}
function Next() {
  const nowPathIndex = router.getRoutes().findIndex((item) => {
    return item.path == route.path;
  });
  const nextPath = router.getRoutes()[nowPathIndex + 1];
  if (nextPath) {
    router.replace(nextPath);
  }
}

/*
 * 过渡实现方法
 */

// 添加样式
function addClass(to: any, from: any) {
  const toPathIndex = router.getRoutes().findIndex((item) => {
    return item.path == to.path;
  });
  const fromPathIndex = router.getRoutes().findIndex((item) => {
    return item.path == from.path;
  });
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
  const toPathIndex = router.getRoutes().findIndex((item) => {
    return item.path == to.path;
  });
  const fromPathIndex = router.getRoutes().findIndex((item) => {
    return item.path == from.path;
  });
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

<template>
  <div ref="touchEvent" @mousedown.prevent="onMouseDown($event)" @mousemove.prevent="onMouseMove($event)"
    @mouseup.prevent="onMouseUp()" @touchstart.passive="onTouchStart($event)" @touchmove.passive="onTouchMove($event)"
    @touchend.passive="onTouchEnd()">
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: "ZyTouch",
  props: {
    init: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // 初始化
    let viewTop = 0;
    let viewLeft = 0;
    let viewWidth = 0;
    let viewHeight = 0;
    const touchEvent = ref<HTMLElement | null>(null);
    const initViewSize = () => {
      if (touchEvent.value) {
        viewTop = touchEvent.value.offsetTop;
        viewLeft = touchEvent.value.offsetLeft;
        viewHeight = touchEvent.value.offsetHeight;
        viewWidth = touchEvent.value.offsetWidth;
        // console.log("init", viewWidth, viewHeight);
      }
    };
    onMounted(() => {
      initViewSize();
      // 监听浏览器窗口变化
      window.addEventListener("resize", () => {
        setTimeout(() => {
          initViewSize();
        }, 100);
      });
    });
    watch(
      () => props.init,
      (newValue: any) => {
        if (newValue) {
          setTimeout(() => {
            initViewSize();
          }, 100);
        }
      }
    );
    // 越界判断函数
    const crossBorder = () => {
      if (endX < viewLeft + 20 || endX > viewLeft + viewWidth - 20) {
        return true;
      } else if (endY < viewTop + 20 || endY > viewTop + viewHeight - 20) {
        return true;
      } else {
        return false;
      }
    };

    let startX = 0; // 触摸开始X轴位置
    let startY = 0; // 触摸开始Y轴位置
    let endX = 0; // 触摸结束X轴位置
    let endY = 0; // 触摸结束Y轴位置
    let moveDistanceX = 0; // 触摸移动X轴距离
    let moveDistanceY = 0; // 触摸移动Y轴距离
    let mouseDown = false; //定义一个变量判断是否执行移动函数
    let startTime = 0; // 触摸开始时间
    let endTime = 0; // 触摸结束时间
    let moveTime = 0; // 触摸时间
    // 鼠标按下
    const onMouseDown = (e: MouseEvent) => {
      startTime = new Date().getTime();
      startX = e.clientX;
      startY = e.clientY;
      mouseDown = true;
      // console.log("MouseDown:", e.clientX, e.clientY);
    };
    // 鼠标移动
    const onMouseMove = (e: MouseEvent) => {
      if (mouseDown == true) {
        endX = e.clientX;
        endY = e.clientY;
        moveDistanceX = startX - endX;
        moveDistanceY = startY - endY;
        startTranslate(moveDistanceX, moveDistanceY);
        // console.log("MouseMove:", moveDistanceX, moveDistanceY);
      }
    };
    // 鼠标松开
    const onMouseUp = () => {
      endTime = new Date().getTime();
      moveTime = endTime - startTime;
      mouseDown = false;
      stopTranslate(moveDistanceX, moveDistanceY);
      moveDistanceX = 0;
      moveDistanceY = 0;
      // console.log("MouseUp");
    };
    // 触屏按住
    const onTouchStart = (e: TouchEvent) => {
      startTime = new Date().getTime();
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      // console.log("TouchStart:", e.touches[0].clientX, e.touches[0].clientY);
    };
    // 触屏拖动
    const onTouchMove = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      moveDistanceX = startX - endX;
      moveDistanceY = startY - endY;
      startTranslate(moveDistanceX, moveDistanceY);
      // console.log("TouchMove:", moveDistanceX, moveDistanceY);
    };
    // 触屏离开
    const onTouchEnd = () => {
      endTime = new Date().getTime();
      moveTime = endTime - startTime;
      stopTranslate(moveDistanceX, moveDistanceY);
      moveDistanceX = 0;
      moveDistanceY = 0;
      // console.log("TouchEnd");
    };

    // 正在拖动时
    const startTranslate = (moveDistanceX: number, moveDistanceY: number) => {
      // 判断滑动距离超过10
      if (Math.abs(moveDistanceX) > 10 || Math.abs(moveDistanceY) > 10) {
        // 判断是否越界
        if (!crossBorder()) {
          // 没有越界，判断X轴移动的距离是否大于Y轴移动的距离
          if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
            // 左右滑动
            // console.log(moveDistanceX > 0 ? "左" : "右");
            if (moveDistanceX > 0) {
              emit("slidingLeft", {
                moveDistanceX: moveDistanceX,
              });
            } else {
              emit("slidingRight", {
                moveDistanceX: moveDistanceX,
              });
            }
          } else {
            // 上下滑动
            // console.log(moveDistanceY > 0 ? "上" : "下");
            if (moveDistanceY > 0) {
              emit("slidingUp", {
                moveDistanceY: moveDistanceY,
              });
            } else {
              emit("slidingDown", {
                moveDistanceY: moveDistanceY,
              });
            }
          }
        } else {
          // 越界，直接释放
          onMouseUp();
          onTouchEnd();
        }
      }
    };
    // 释放拖动时
    const stopTranslate = (moveDistanceX: number, moveDistanceY: number) => {
      // 判断滑动距离超过10
      if (Math.abs(moveDistanceX) > 10 || Math.abs(moveDistanceY) > 10) {
        // 判断X轴移动的距离是否大于Y轴移动的距离
        if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
          // 左右
          // console.log(moveDistanceX > 0 ? "左" : "右");
          if (moveDistanceX > 0) {
            // 向左滑动
            if (moveDistanceX > viewWidth / 6) {
              // 如果滑动距离超过1/6，触发
              emit("slideEndLeft", {
                moveDistanceX: moveDistanceX,
              });
            } else {
              // 如果滑动距离未超过1/6，取消
              emit("slideCancelLeft", {
                moveDistanceX: moveDistanceX,
              });
            }
          } else {
            // 向右滑动
            if (moveDistanceX < 0 - viewWidth / 6) {
              // 如果滑动距离超过1/6，触发
              emit("slideEndRight", {
                moveDistanceX: moveDistanceX,
              });
            } else {
              // 如果滑动距离未超过1/6，取消
              emit("slideCancelRight", {
                moveDistanceX: moveDistanceX,
              });
            }
          }
        } else {
          // 上下
          // console.log(moveDistanceY > 0 ? "上" : "下");
          if (moveDistanceY > 0) {
            // 向上滑动
            if (moveDistanceY > viewHeight / 6) {
              // 如果滑动距离超过1/6，触发
              emit("slideEndUp", {
                moveDistanceY: moveDistanceY,
              });
            } else {
              // 如果滑动距离未超过1/6，取消
              emit("slideCancelUp", {
                moveDistanceY: moveDistanceY,
              });
            }
          } else {
            // 向下滑动
            if (moveDistanceY < 0 - viewHeight / 6) {
              // 如果滑动距离超过1/6，触发
              emit("slideEndDown", {
                moveDistanceY: moveDistanceY,
              });
            } else {
              // 如果滑动距离未超过1/6，取消
              emit("slideCancelDown", {
                moveDistanceY: moveDistanceY,
              });
            }
          }
        }
      }
    };

    return {
      touchEvent,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
};
</script>

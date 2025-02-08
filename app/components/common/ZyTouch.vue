<template>
  <div
    ref="touchEvent"
    @mousedown.prevent="onMouseDown"
    @mousemove.prevent="onMouseMove"
    @mouseup.prevent="onMouseUp"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend.passive="onTouchEnd"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  init: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "slidingLeft", payload: { moveDistanceX: number }): void;
  (e: "slidingRight", payload: { moveDistanceX: number }): void;
  (e: "slidingUp", payload: { moveDistanceY: number }): void;
  (e: "slidingDown", payload: { moveDistanceY: number }): void;
  (e: "slideEndLeft", payload: { moveDistanceX: number }): void;
  (e: "slideCancelLeft", payload: { moveDistanceX: number }): void;
  (e: "slideEndRight", payload: { moveDistanceX: number }): void;
  (e: "slideCancelRight", payload: { moveDistanceX: number }): void;
  (e: "slideEndUp", payload: { moveDistanceY: number }): void;
  (e: "slideCancelUp", payload: { moveDistanceY: number }): void;
  (e: "slideEndDown", payload: { moveDistanceY: number }): void;
  (e: "slideCancelDown", payload: { moveDistanceY: number }): void;
}>();

const touchEvent = ref<HTMLElement | null>(null);

let viewTop = 0;
let viewLeft = 0;
let viewWidth = 0;
let viewHeight = 0;

const initViewSize = () => {
  if (touchEvent.value) {
    viewTop = touchEvent.value.offsetTop;
    viewLeft = touchEvent.value.offsetLeft;
    viewHeight = touchEvent.value.offsetHeight;
    viewWidth = touchEvent.value.offsetWidth;
  }
};

onMounted(() => {
  initViewSize();
  window.addEventListener("resize", () => {
    setTimeout(() => {
      initViewSize();
    }, 100);
  });
});

watch(
  () => props.init,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        initViewSize();
      }, 100);
    }
  }
);

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let moveDistanceX = 0;
let moveDistanceY = 0;
let mouseDown = false;
let startTime = 0;
let endTime = 0;
let moveTime = 0;

const onMouseDown = (e: MouseEvent) => {
  startTime = new Date().getTime();
  startX = e.clientX;
  startY = e.clientY;
  mouseDown = true;
};

const onMouseMove = (e: MouseEvent) => {
  if (mouseDown) {
    endX = e.clientX;
    endY = e.clientY;
    moveDistanceX = startX - endX;
    moveDistanceY = startY - endY;
    startTranslate(moveDistanceX, moveDistanceY);
    initViewSize();
  }
};

const onMouseUp = () => {
  endTime = new Date().getTime();
  moveTime = endTime - startTime;
  mouseDown = false;
  stopTranslate(moveDistanceX, moveDistanceY);
  moveDistanceX = 0;
  moveDistanceY = 0;
};

const onTouchStart = (e: TouchEvent) => {
  startTime = new Date().getTime();
  if (e.touches[0]) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }
};

const onTouchMove = (e: TouchEvent) => {
  if (e.changedTouches[0]) {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
  }
  moveDistanceX = startX - endX;
  moveDistanceY = startY - endY;
  startTranslate(moveDistanceX, moveDistanceY);
  initViewSize();
};

const onTouchEnd = () => {
  endTime = new Date().getTime();
  moveTime = endTime - startTime;
  stopTranslate(moveDistanceX, moveDistanceY);
  moveDistanceX = 0;
  moveDistanceY = 0;
};

const crossBorder = () => {
  if (endX < viewLeft + 5 || endX > viewLeft + viewWidth - 5) {
    return true;
  } else if (endY < viewTop + 5 || endY > viewTop + viewHeight - 5) {
    return true;
  } else {
    return false;
  }
};

const startTranslate = (moveDistanceX: number, moveDistanceY: number) => {
  if (Math.abs(moveDistanceX) > 10 || Math.abs(moveDistanceY) > 10) {
    if (!crossBorder()) {
      if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
        if (moveDistanceX > 0) {
          emit("slidingLeft", { moveDistanceX });
        } else {
          emit("slidingRight", { moveDistanceX });
        }
      } else {
        if (moveDistanceY > 0) {
          emit("slidingUp", { moveDistanceY });
        } else {
          emit("slidingDown", { moveDistanceY });
        }
      }
    } else {
      onMouseUp();
      onTouchEnd();
    }
  }
};

const stopTranslate = (moveDistanceX: number, moveDistanceY: number) => {
  if (Math.abs(moveDistanceX) > 10 || Math.abs(moveDistanceY) > 10) {
    if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
      if (moveDistanceX > 0) {
        if (moveDistanceX > viewWidth / 6) {
          emit("slideEndLeft", { moveDistanceX });
        } else {
          emit("slideCancelLeft", { moveDistanceX });
        }
      } else {
        if (moveDistanceX < 0 - viewWidth / 6) {
          emit("slideEndRight", { moveDistanceX });
        } else {
          emit("slideCancelRight", { moveDistanceX });
        }
      }
    } else {
      if (moveDistanceY > 0) {
        if (moveDistanceY > viewHeight / 6) {
          emit("slideEndUp", { moveDistanceY });
        } else {
          emit("slideCancelUp", { moveDistanceY });
        }
      } else {
        if (moveDistanceY < 0 - viewHeight / 6) {
          emit("slideEndDown", { moveDistanceY });
        } else {
          emit("slideCancelDown", { moveDistanceY });
        }
      }
    }
  }
};
</script>

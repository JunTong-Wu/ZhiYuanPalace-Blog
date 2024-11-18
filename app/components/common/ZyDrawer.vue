<template>
  <Teleport to="body">
    <aside class="fixed inset-0" v-if="componentsDisplay" :style="`z-index: ${zIndex};`" ref="el" :class="{ dark: dark }"
      @touchmove.passive="preventTouchGesture($event)">
      <div class="fixed inset-0 transition-opacity duration-200 bg-mask" :class="maskClass" :style="maskStyle"
        @click="closeByMask" v-if="mask"></div>
      <ZyTouch class="drawer-main cursor-grab fixed h-full will-change-transform" :init="touchInit" :style="mainStyle"
        @slidingLeft="slidingLeft" @slidingRight="slidingRight" @slidingUp="slidingUp" @slidingDown="slidingDown"
        @slideEndLeft="slideEndLeft" @slideEndRight="slideEndRight" @slideEndUp="slideEndUp" @slideEndDown="slideEndDown"
        @slideCancelLeft="slideCancel" @slideCancelRight="slideCancel" @slideCancelUp="slideCancel"
        @slideCancelDown="slideCancel">
        <div v-if="!hideHeader" class="flex justify-between items-center h-16 px-6 text-base text-text-1">
          <div>
            <h2 v-if="title" class="text-xl portrait:text-lg portrait:font-normal text-text-1">
              {{ title }}
            </h2>
          </div>
          <span class="cursor-pointer" @click="closeByButton" v-show="closable" v-if="componentsDisplay" @mousedown.stop
            @mousemove.stop @mouseup.stop>
            <UIcon name="i-fluent-dismiss-16-regular" class="w-4 h-4" />
          </span>
        </div>
        <div class="h-full overflow-auto flex flex-col">
          <slot />
        </div>
      </ZyTouch>
    </aside>
  </Teleport>
</template>

<script lang="ts" setup>
const ANIMATION_DURATION = 400; // 动画时长

const props = defineProps({
  display: { type: Boolean },
  position: { type: String, default: "right" },
  size: { type: String, default: "340px" },
  title: { type: String, default: "" },
  closable: { type: Boolean, default: true },
  mask: { type: Boolean, default: true },
  maskClosable: { type: Boolean, default: true },
  maskColor: { type: String, default: "transparent" },
  maskBlur: { type: Boolean, default: false },
  zIndex: { type: Number, default: 2000 },
  hideHeader: { type: Boolean, default: false },
  dark: { type: Boolean, default: false },
  background: { type: String, default: "" },
});

const emit = defineEmits(["cancel"]);

const componentsDisplay = ref(false);
const visible = ref(false);
const touchInit = ref(0);
const transitioning = ref(false);
const requestQueue = ref<Function[]>([]); // 用于存储状态变化的请求队列

const maskClass = ref({
  "opacity-100": false,
  "opacity-0": true,
  "backdrop-blur-xl": true,
});

const classInit = () => {
  maskClass.value = {
    "opacity-100": props.mask && visible.value,
    "opacity-0": !(props.mask && visible.value),
    "backdrop-blur-xl": props.mask && props.maskBlur && visible.value,
  };
};
classInit();

const maskStyle = ref({
  background: props.maskColor,
});

const mainStyle = ref({
  width: "auto",
  height: "auto",
  top: "auto",
  bottom: "auto",
  left: "auto",
  right: "auto",
  transform: "",
  background: "",
});

const mainStyleInit = () => {
  let positionTop = "auto";
  let positionBottom = "auto";
  let positionLeft = "auto";
  let positionRight = "auto";
  let positionWidth = "auto";
  let positionHeight = "auto";
  let transform = "";
  let background = "";

  if (props.position == "right") {
    positionRight = "0";
    positionTop = "0";
    positionBottom = "0";
    positionWidth = props.size;
    if (visible.value) {
      transform = "translateX(0px)";
    } else {
      transform = `translateX(calc(0px + ${props.size}))`;
    }
  } else if (props.position == "left") {
    positionLeft = "0";
    positionTop = "0";
    positionBottom = "0";
    positionWidth = props.size;
    if (visible.value) {
      transform = "translateX(0px)";
    } else {
      transform = `translateX(calc(0px - ${props.size}))`;
    }
  } else if (props.position == "top") {
    positionTop = "0";
    positionLeft = "0";
    positionRight = "0";
    positionHeight = props.size;
    if (visible.value) {
      transform = "translateY(0px)";
    } else {
      transform = `translateY(calc(0px - ${props.size}))`;
    }
  } else if (props.position == "bottom") {
    positionBottom = "0";
    positionLeft = "0";
    positionRight = "0";
    positionHeight = props.size;
    if (visible.value) {
      transform = "translateY(0px)";
    } else {
      transform = `translateY(calc(0px + ${props.size}))`;
    }
  }

  if (props.background && props.background != "") {
    background = props.background;
  }
  mainStyle.value = {
    width: positionWidth,
    height: positionHeight,
    top: positionTop,
    bottom: positionBottom,
    left: positionLeft,
    right: positionRight,
    transform: transform,
    background: background,
  };
};
mainStyleInit();

const el = ref(null);

const translate = (translate: string | null, transition: boolean) => {
  if (el.value) {
    const drawerMain = (el.value as any).querySelector(".drawer-main");
    if (transition) {
      drawerMain.style.transition = `transform ${ANIMATION_DURATION}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
      setTimeout(() => {
        drawerMain.style.transition = `none`;
      }, ANIMATION_DURATION);
    }
    if (translate) {
      drawerMain.style.transform = translate;
    }
  }
};

watch(
  () => props.display,
  (newValue: any) => {
    // 使用 requestQueue 存储状态变化的请求队列，解决 await 被延迟处理导致的状态竞争，导致状态变化的同步不及时问题
    if (newValue) {
      requestQueue.value.push(() => open());
    } else {
      requestQueue.value.push(() => close(true));
    }
    processQueue();
  }
);

const processQueue = async () => {
  if (transitioning.value || requestQueue.value.length === 0) return;
  transitioning.value = true;
  const action = requestQueue.value.shift();
  if (action) await action();
  transitioning.value = false;
  processQueue(); // 不添加 await，确保不陷入递归调用栈
};

const close = async (byParent = false) => {
  visible.value = false;
  translate(null, true);
  mainStyleInit();
  classInit();

  await sleep(ANIMATION_DURATION);

  componentsDisplay.value = false;
  const body = document.documentElement;
  if (body) {
    body.style.overflow = "auto";
  }
  if (!byParent) {
    emit("cancel");
  }
};

const open = async () => {
  const body = document.documentElement;
  if (body) {
    body.style.overflow = "hidden";
  }

  componentsDisplay.value = true;
  visible.value = true;

  await nextTick();

  translate(null, true);
  mainStyleInit();
  classInit();

  await sleep(ANIMATION_DURATION); // 等待动画结束后刷新触摸监听区域

  touchInit.value = Date.now();
};

const closeByMask = () => {
  if (props.maskClosable) {
    close();
  }
};

const closeByButton = () => {
  close();
};

const slidingLeft = (val: any) => {
  if (props.position == "left") {
    translate(`translateX(calc(0px - ${val.moveDistanceX}px))`, false);
  }
};
const slidingRight = (val: any) => {
  if (props.position == "right") {
    translate(`translateX(calc(0px - ${val.moveDistanceX}px))`, false);
  }
};
const slidingUp = (val: any) => {
  if (props.position == "top") {
    translate(`translateY(calc(0px - ${val.moveDistanceY}px))`, false);
  }
};
const slidingDown = (val: any) => {
  if (props.position == "bottom") {
    translate(`translateY(calc(0px - ${val.moveDistanceY}px))`, false);
  }
};
const slideEndLeft = () => {
  if (props.position == "left") {
    close();
  }
};
const slideEndRight = () => {
  if (props.position == "right") {
    close();
  }
};
const slideEndUp = () => {
  if (props.position == "top") {
    close();
  }
};
const slideEndDown = () => {
  if (props.position == "bottom") {
    close();
  }
};
const slideCancel = () => {
  translate(null, true);
  mainStyleInit();
};

const preventTouchGesture = (e: TouchEvent) => {
  e.cancelable && e.preventDefault();
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
</script>

<template>
  <div @click="showPopover" ref="listenElement">
    <slot name="reference" />
  </div>
  <Teleport to="body">
    <aside
      fixed
      inset-0
      v-if="display"
      :style="`z-index: ${zIndex};`"
      ref="el"
      :class="{ dark: dark }"
      @touchmove="preventTouchGesture($event)"
    >
      <div
        fixed
        inset-0
        transition
        duration-500
        :class="maskClass"
        @click="closeByMask"
        v-if="mask"
      ></div>
      <div
        ref="mainElement"
        class="drawer-main"
        bg="bg-4"
        fixed
        h-full
        will-change-transform
        rounded-lg
        shadow-2xl
        min-w-24
        :style="mainStyle"
        border="none dark:1 dark:solid dark:bordercolor"
      >
        <div h-full overflow-auto>
          <div class="arrow"></div>
          <slot name="actions" />
        </div>
      </div>
    </aside>
  </Teleport>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-popover",
  props: {
    position: { type: String, default: "top" }, // 指定方向
    size: { type: String, default: "auto" }, // 指定宽度
    title: { type: String, default: "标题" }, // 指定标题
    closable: { type: Boolean, default: true }, // 指定是否显示关闭按钮
    mask: { type: Boolean, default: true }, // 指定是否显示遮罩
    maskClosable: { type: Boolean, default: true }, // 指定是否点击遮罩关闭
    zIndex: { type: Number, default: 2000 }, // 指定显示层级
    hideHeader: { type: Boolean, default: false }, // 指定是否隐藏头部
    dark: { type: Boolean, default: false }, // 指定是否独立开启暗色
    background: { type: String, default: "" }, // 指定背景色
  },
  setup(props) {
    const display = ref(false);
    const visible = ref(false);
    const clientX = ref(0);
    const clientY = ref(0);

    /*
     * 样式初始化
     */
    const maskClass = ref({
      "opacity-100": false,
      "opacity-0": true,
    });
    const classInit = () => {
      maskClass.value = {
        // 通过visible的真假切换类名
        "opacity-100": props.mask && visible.value,
        "opacity-0": !(props.mask && visible.value),
      };
    };
    classInit();

    // 通过position的值确定位置，通过visible的真假改变transform过渡
    const mainStyle = ref({
      width: "auto",
      height: "auto",
      top: "auto",
      bottom: "auto",
      left: "auto",
      right: "auto",
      transform: "",
      opacity: 0,
    });
    const mainStyleInit = () => {
      let positionTop = "auto";
      let positionBottom = "auto";
      let positionLeft = "auto";
      let positionRight = "auto";
      let positionWidth = "auto";
      let positionHeight = "auto";
      let transform = "";
      let opacity = 0;

      positionTop = `${clientY.value}px`;
      positionLeft = `${clientX.value}px`;
      if (visible.value) {
        transform = "translateY(0px) scale(1)";
        opacity = 1;
      } else {
        transform = `translateY(-1rem) scale(0.8)`;
        opacity = 0;
      }

      mainStyle.value = {
        width: positionWidth,
        height: positionHeight,
        top: positionTop,
        bottom: positionBottom,
        left: positionLeft,
        right: positionRight,
        transform: transform,
        opacity: opacity,
      };
    };
    mainStyleInit();

    /*
     * 过渡效果实现
     */
    // 过渡效果方法，传入变换CSS字符串，和是否开启CSS过渡效果
    const el = ref(null);
    const translate = (translate: string | null, transition: boolean) => {
      if (el.value) {
        const drawerMain = (el.value as any).querySelector(".drawer-main");
        if (transition) {
          // 通常，正在滑动时不开启CSS过渡，释放滑动时开启CSS过渡
          drawerMain.style.transition = `transform 600ms cubic-bezier(0.165, 0.84, 0.44, 1) , opacity 600ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
          setTimeout(() => {
            drawerMain.style.transition = `none`;
          }, 600);
        }
        if (translate) {
          drawerMain.style.transform = translate;
        }
      }
    };

    /*
     * 打开逻辑
     */
    const offset = (obj: any, direction: string) => {
      //将top,left首字母大写,并拼接成offsetTop,offsetLeft
      var offsetDir =
        "offset" + direction[0].toUpperCase() + direction.substring(1);
      var realNum = obj[offsetDir];
      var positionParent = obj.offsetParent; //获取上一级定位元素对象
      while (positionParent != null) {
        realNum += positionParent[offsetDir];
        positionParent = positionParent.offsetParent;
      }
      return realNum;
    };

    const listenElement = ref(null);
    const mainElement = ref(null);
    const showPopover = () => {
      display.value = true;
    };

    watch(
      () => display.value,
      (newValue) => {
        // 抽屉打开时阻止页面滚动
        if (newValue) {
          const body = document.documentElement;
          if (body) {
            body.style.overflowY = "hidden";
          }
        } else {
          const body = document.documentElement;
          if (body) {
            body.style.overflowY = "auto";
          }
        }
        // 打开时，先监听display，再异步改变visible，实现进入动画
        setTimeout(() => {
          visible.value = newValue;
          if (newValue) {
            if (listenElement.value) {
              clientY.value =
                offset(listenElement.value, "top") +
                (listenElement.value as any).offsetHeight;

              const drawerMain = mainElement.value as any;
              const drawerMainWidth = drawerMain.clientWidth;
              const listenElementLeft = offset(listenElement.value, "left");
              const listenElementWidth = (listenElement.value as any)
                .offsetWidth;
              clientX.value =
                listenElementLeft +
                listenElementWidth / 2 -
                drawerMainWidth / 2;
            }
          }

          translate(null, true);
          mainStyleInit();
          classInit();
        }, 0);
      }
    );

    /*
     * 关闭逻辑
     */
    const close = () => {
      // 关闭时，先改变visible，再延迟改变display，实现退出动画
      visible.value = false;
      translate(null, true);
      mainStyleInit();
      classInit();
      setTimeout(() => {
        display.value = false;
      }, 300);
    };
    // 点击遮罩
    const closeByMask = () => {
      // 如果开启了点击遮罩关闭
      if (props.maskClosable) {
        close();
      }
    };
    // 点击关闭按钮
    const closeByButton = () => {
      close();
    };

    // 监听浏览器窗口变化
    if (process.client) {
      window.addEventListener("resize", () => {
        setTimeout(() => {
          close();
        }, 100);
      });
    }

    // 阻止vivo浏览器手势
    const preventTouchGesture = (e: TouchEvent) => {
      e.cancelable && e.preventDefault();
    };

    return {
      display,
      showPopover,
      listenElement,
      mainElement,
      el,
      maskClass,
      mainStyle,
      closeByMask,
      closeByButton,
      preventTouchGesture,
    };
  },
});
</script>
<style lang="scss" scoped>
.arrow {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
}
.arrow::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  border: 0.7rem solid;
  border-top: none;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: rgba(127, 127, 127, 0.2);
  z-index: -1;
  display: none;
}
.dark .arrow::before {
  display: block;
}
.arrow::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 0.6rem solid;
  border-top: none;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: var(--bg-4);
  z-index: -1;
}
</style>

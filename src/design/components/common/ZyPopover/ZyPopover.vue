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
    >
      <div
        fixed
        inset-0
        bg="bg-mask"
        transition
        duration-500
        :class="maskClass"
        @click="closeByMask"
        v-if="mask"
      ></div>
      <div
        class="drawer-main"
        fixed
        h-full
        will-change-transform
        :style="mainStyle"
      >
        <div h-full overflow-auto>
          <slot name="actions" />
        </div>
      </div>
    </aside>
  </Teleport>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-slide-popover",
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
      "backdrop-blur": true,
    });
    const classInit = () => {
      maskClass.value = {
        // 通过visible的真假切换类名
        "opacity-100": props.mask && visible.value,
        "opacity-0": !(props.mask && visible.value),
        "backdrop-blur": props.mask && visible.value,
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

      positionTop = `${clientY.value}px`;
      positionLeft = `${clientX.value}px`;
      if (visible.value) {
        transform = "translateY(0px)";
      } else {
        transform = `translateY(-1rem)`;
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
          drawerMain.style.transition = `transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
          setTimeout(() => {
            drawerMain.style.transition = `none`;
          }, 400);
        }
        if (translate) {
          drawerMain.style.transform = translate;
        }
      }
    };

    /*
     * 打开逻辑
     */
    const listenElement = ref(null);
    const showPopover = (e: any) => {
      if (listenElement.value) {
        console.log(listenElement.value);
        clientX.value =
          (listenElement.value as any).offsetLeft +
          (listenElement.value as any).offsetWidth;
        clientY.value =
          (listenElement.value as any).offsetTop +
          (listenElement.value as any).offsetHeight;
      } else {
        clientX.value = e.clientX;
        clientY.value = e.clientY;
      }

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

    return {
      display,
      showPopover,
      listenElement,
      el,
      maskClass,
      mainStyle,
      closeByMask,
      closeByButton,
    };
  },
});
</script>

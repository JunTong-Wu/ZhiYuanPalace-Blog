<template>
  <aside
    fixed
    inset-0
    v-show="display"
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
    <ZyTouch
      class="drawer-main"
      cursor-grab
      fixed
      h-full
      :init="touchInit"
      :style="mainStyle"
      @slidingLeft="slidingLeft"
      @slidingRight="slidingRight"
      @slidingUp="slidingUp"
      @slidingDown="slidingDown"
      @slideEndLeft="slideEndLeft"
      @slideEndRight="slideEndRight"
      @slideEndUp="slideEndUp"
      @slideEndDown="slideEndDown"
      @slideCancelLeft="slideCancel"
      @slideCancelRight="slideCancel"
      @slideCancelUp="slideCancel"
      @slideCancelDown="slideCancel"
    >
      <div
        v-if="!hideHeader"
        flex
        justify-between
        items-center
        h-header
        md:h-header-xl
        px-6
        text-sm
        color="text-1"
        font-bold
        border="b solid bordercolor t-0 l-0 r-0"
      >
        <span>{{ title }}</span>
        <span
          cursor-pointer
          @click="closeByButton"
          v-show="closable"
          v-if="display"
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
        >
          <ZyIcon
            size="1.2rem"
            lineName="line-md:close-small"
            lineColor="var(--text-1)"
          />
        </span>
      </div>
      <div h-full overflow-auto>
        <slot />
      </div>
    </ZyTouch>
  </aside>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-slide-drawer",
  data() {
    return {
      visible: false, // 是否视觉显示
    };
  },
  props: {
    display: { type: Boolean }, // 指定是否物理打开
    position: { type: String, default: "right" }, // 指定方向
    size: { type: String, default: "340px" }, // 指定宽度
    title: { type: String, default: "标题" }, // 指定标题
    closable: { type: Boolean, default: true }, // 指定是否显示关闭按钮
    mask: { type: Boolean, default: true }, // 指定是否显示遮罩
    maskClosable: { type: Boolean, default: true }, // 指定是否点击遮罩关闭
    zIndex: { type: Number, default: 2000 }, // 指定显示层级
    hideHeader: { type: Boolean, default: false }, // 指定是否隐藏头部
    dark: { type: Boolean, default: false }, // 指定是否独立开启暗色
    background: { type: String, default: false }, // 指定是否拥有背景色
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const touchInit = ref(false);

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

      if (props.position == "right") {
        // 如果从右边弹出
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
        // 如果从左边弹出
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
        // 如果从上边弹出
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
        // 如果从下边弹出
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

    /*
     * 过渡效果实现
     */
    // 过渡效果方法，传入变换CSS字符串，和是否开启CSS过渡效果
    const el = ref(null);
    const translate = (translate: string | null, transition: boolean) => {
      if (el) {
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
    watch(
      () => props.display,
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
        // 初始化触控区域
        if (newValue) {
          touchInit.value = true;
          setTimeout(() => {
            touchInit.value = false;
          }, 0);
        }
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
        emit("cancel");
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

    /*
     * 交互接收
     */
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
    return {
      el,
      touchInit,
      maskClass,
      mainStyle,
      closeByMask,
      closeByButton,
      slidingLeft,
      slidingRight,
      slidingUp,
      slidingDown,
      slideEndLeft,
      slideEndRight,
      slideEndUp,
      slideEndDown,
      slideCancel,
    };
  },
});
</script>

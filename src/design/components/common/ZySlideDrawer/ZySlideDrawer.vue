<template>
  <div class="drawer" v-show="display" :style="`z-index: ${zIndex};`">
    <div :class="maskClass" @click="closeByMask"></div>
    <div
      :class="mainClass"
      :style="mainStyle"
      @mousedown.prevent="onDrawerMouseDown($event)"
      @mousemove.prevent="onDrawerMouseMove($event)"
      @mouseup.prevent="onDrawerMouseUp($event)"
      @touchstart="onDrawerTouchStart($event)"
      @touchmove.prevent="onDrawerTouchMove($event)"
      @touchend="onDrawerTouchEnd($event)"
    >
      <div class="drawer-head" v-if="!hideHeader">
        <span>{{ title }}</span>
        <span
          class="close-btn"
          v-show="closable"
          @click="closeByButton"
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
          >×</span
        >
      </div>
      <div class="drawer-body">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      visible: false, // 是否视觉显示
      startX: 0, // 触摸开始X轴位置
      startY: 0, // 触摸开始Y轴位置
      endX: 0, // 触摸结束X轴位置
      endY: 0, // 触摸结束Y轴位置
      moveDistanceX: 0, // 触摸移动X轴距离
      moveDistanceY: 0, // 触摸移动Y轴距离
      mouseDown: false, //定义一个变量判断是否执行移动函数
    };
  },
  props: {
    teleport: { type: String, default: "" }, // 指定挂载位置
    display: { type: Boolean }, // 指定是否物理打开
    position: { type: String, default: "right" }, // 指定方向
    size: { type: String, default: "340px" }, // 指定宽度
    title: { type: String, default: "标题" }, // 指定标题
    closable: { type: Boolean, default: true }, // 指定是否显示关闭按钮
    mask: { type: Boolean, default: true }, // 指定是否显示遮罩
    maskClosable: { type: Boolean, default: true }, // 指定是否点击遮罩关闭
    zIndex: { type: Number, default: 2000 }, // 指定显示层级
    hideHeader: { type: Boolean, default: false }, // 指定是否隐藏头部
    theme: { type: String, default: "default" }, // 指定主题
  },
  watch: {
    display: {
      handler(newVal) {
        // 抽屉打开时阻止页面滚动
        if (newVal) {
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
          this.visible = newVal;
        }, 0);
      },
      //  如果需要第一次就执行监听 则需要设置：immediate: true
      immediate: true,
    },
  },
  computed: {
    maskClass() {
      return {
        "drawer-mask": true,
        // 通过visible的真假切换类名
        "drawer-mask-show": this.mask && this.visible,
        "drawer-mask-hide": !(this.mask && this.visible),
      };
    },
    mainClass() {
      return {
        "drawer-main": true,
        // 通过visible的真假切换类名
        "drawer-main-show": this.visible,
        "drawer-main-hide": !this.visible,
        // 添加方向类名
        "drawer-main-position-left": this.position == "left",
        "drawer-main-position-right": this.position == "right",
        "drawer-main-position-top": this.position == "top",
        "drawer-main-position-bottom": this.position == "bottom",
      };
    },
    // 通过position的值确定位置，通过visible的真假改变transform过渡
    mainStyle() {
      let positionTop = "auto";
      let positionBottom = "auto";
      let positionLeft = "auto";
      let positionRight = "auto";
      let positionWidth = "auto";
      let positionHeight = "auto";
      let transform = "";

      if (this.position == "right") {
        // 如果从右边弹出
        positionRight = "0";
        positionTop = "0";
        positionBottom = "0";
        positionWidth = this.size;
        if (this.visible) {
          transform = "translateX(0px)";
        } else {
          transform = `translateX(calc(0px + ${this.size}))`;
        }
      } else if (this.position == "left") {
        // 如果从左边弹出
        positionLeft = "0";
        positionTop = "0";
        positionBottom = "0";
        positionWidth = this.size;
        if (this.visible) {
          transform = "translateX(0px)";
        } else {
          transform = `translateX(calc(0px - ${this.size}))`;
        }
      } else if (this.position == "top") {
        // 如果从上边弹出
        positionTop = "0";
        positionLeft = "0";
        positionRight = "0";
        positionHeight = this.size;
        if (this.visible) {
          transform = "translateY(0px)";
        } else {
          transform = `translateY(calc(0px - ${this.size}))`;
        }
      } else if (this.position == "bottom") {
        // 如果从下边弹出
        positionBottom = "0";
        positionLeft = "0";
        positionRight = "0";
        positionHeight = this.size;
        if (this.visible) {
          transform = "translateY(0px)";
        } else {
          transform = `translateY(calc(0px + ${this.size}))`;
        }
      }

      let background = "var(--bg-5)";

      return {
        width: positionWidth,
        height: positionHeight,
        top: positionTop,
        bottom: positionBottom,
        left: positionLeft,
        right: positionRight,
        transform: transform,
        background: background,
      };
    },
  },
  mounted() {
    // 如果指定了挂载位置
    if (this.teleport != "") {
      // 从组件标签所在位置删除节点
      this.$el.parentNode.removeChild(this.$el);
      // 往指定位置添加节点
      const rootElement = document.querySelector(`${this.teleport}`);
      if (rootElement) {
        rootElement.appendChild(this.$el);
      }
    }
  },
  methods: {
    // 点击遮罩
    closeByMask() {
      // 如果开启了点击遮罩关闭
      if (this.maskClosable) {
        this.close();
      }
    },
    // 点击关闭按钮
    closeByButton() {
      this.close();
    },
    // 关闭逻辑
    close() {
      // 关闭时，先改变visible，再延迟改变display，实现退出动画
      this.visible = false;
      setTimeout(() => {
        this.$emit("cancel");
      }, 300);
    },
    // 鼠标按下
    onDrawerMouseDown(e: MouseEvent) {
      // console.log('MouseDown:', e.clientX, e.clientY);
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.mouseDown = true;
    },
    // 鼠标移动
    onDrawerMouseMove(e: MouseEvent) {
      if (this.mouseDown == true) {
        this.endX = e.clientX;
        this.endY = e.clientY;
        this.moveDistanceX = this.startX - this.endX;
        this.moveDistanceY = this.startY - this.endY;
        // console.log('MouseMove:', this.moveDistanceX, this.moveDistanceY);
        this.startTranslateByMove();
      }
    },
    // 鼠标松开
    onDrawerMouseUp(e: MouseEvent) {
      // console.log('MouseUp');
      this.mouseDown = false;
      this.stopTranslateByMove();
      this.moveDistanceX = 0;
      this.moveDistanceY = 0;
    },
    // 触屏按住
    onDrawerTouchStart(e: TouchEvent) {
      // console.log('TouchStart:', e.touches[0].clientX, e.touches[0].clientY);
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    // 触屏拖动
    onDrawerTouchMove(e: TouchEvent) {
      this.endX = e.changedTouches[0].clientX;
      this.endY = e.changedTouches[0].clientY;
      this.moveDistanceX = this.startX - this.endX;
      this.moveDistanceY = this.startY - this.endY;
      // console.log('TouchMove:', this.moveDistanceX, this.moveDistanceY);
      this.startTranslateByMove();
    },
    // 触屏离开
    onDrawerTouchEnd(e: TouchEvent) {
      this.stopTranslateByMove();
      this.moveDistanceX = 0;
      this.moveDistanceY = 0;
    },
    // 修改正在拖动时的样式
    startTranslateByMove() {
      // 过渡时长设置为0
      this.$el.querySelector(".drawer-main").style.transition = `none`;

      if (this.position == "right" && this.moveDistanceX < 0) {
        // 如果从右边弹出，且向右滑动

        this.$el.querySelector(
          ".drawer-main"
        ).style.transform = `translateX(calc(0px - ${this.moveDistanceX}px))`;
      } else if (this.position == "left" && this.moveDistanceX > 0) {
        // 如果从左边弹出，且向左滑动

        this.$el.querySelector(
          ".drawer-main"
        ).style.transform = `translateX(calc(0px - ${this.moveDistanceX}px))`;
      } else if (this.position == "top" && this.moveDistanceY > 0) {
        // 如果从上边弹出，且向上滑动

        this.$el.querySelector(
          ".drawer-main"
        ).style.transform = `translateY(calc(0px - ${this.moveDistanceY}px))`;
      } else if (this.position == "bottom" && this.moveDistanceY < 0) {
        // 如果从下边弹出，且向下滑动

        this.$el.querySelector(
          ".drawer-main"
        ).style.transform = `translateY(calc(0px - ${this.moveDistanceY}px))`;
      }
    },
    // 修改释放拖动时的样式
    stopTranslateByMove() {
      // 过渡时长设置为0.3s
      this.$el.querySelector(
        ".drawer-main"
      ).style.transition = `transform 0.3s`;

      if (this.position == "left") {
        // 如果从左边
        if (this.moveDistanceX > 100) {
          // 如果滑动距离超过100，关闭面板
          this.close();
        } else {
          // 如果滑动距离未超过100，位移还原
          this.$el.querySelector(
            ".drawer-main"
          ).style.transform = `translateX(0px)`;
        }
      } else if (this.position == "right") {
        // 如果从右边弹出
        if (this.moveDistanceX < -100) {
          // 如果滑动距离超过100，关闭面板
          this.close();
        } else {
          // 如果滑动距离未超过100，位移还原
          this.$el.querySelector(
            ".drawer-main"
          ).style.transform = `translateX(0px)`;
        }
      } else if (this.position == "top") {
        // 如果从上边弹出
        if (this.moveDistanceY > 100) {
          // 如果滑动距离超过100，关闭面板
          this.close();
        } else {
          // 如果滑动距离未超过100，位移还原
          this.$el.querySelector(
            ".drawer-main"
          ).style.transform = `translateY(0px)`;
        }
      } else if (this.position == "bottom") {
        // 如果从下边弹出
        if (this.moveDistanceY < -100) {
          // 如果滑动距离超过100，关闭面板
          this.close();
        } else {
          // 如果滑动距离未超过100，位移还原
          this.$el.querySelector(
            ".drawer-main"
          ).style.transform = `translateY(0px)`;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.drawer {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* 遮罩 */
  .drawer-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-mask);
    transition: opacity 0.3s;
  }
  .drawer-mask-show {
    opacity: 1;
  }
  .drawer-mask-hide {
    opacity: 0;
  }
  /* 滑块 */
  .drawer-main {
    position: fixed;
    top: 0;
    height: 100%;
    backdrop-filter: blur(40px);
    transition: transform 0.3s;
    cursor: grab;
  }
  /* 其他样式 */
  .drawer-head {
    display: flex;
    justify-content: space-between;
    height: var(--header-bar-height);
    line-height: var(--header-bar-height);
    padding: 0 var(--spacer-6);
    font-size: var(--font-size-m);
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);
    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: var(--spacer-6);
    }
  }
  .drawer-body {
    height: 100%;
    overflow: auto;
  }
}
</style>

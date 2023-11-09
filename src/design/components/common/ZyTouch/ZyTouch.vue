<template>
  <div
    @mousedown.prevent="onDrawerMouseDown($event)"
    @mousemove.prevent="onDrawerMouseMove($event)"
    @mouseup.prevent="onDrawerMouseUp($event)"
    @touchstart="onDrawerTouchStart($event)"
    @touchmove.prevent="onDrawerTouchMove($event)"
    @touchend="onDrawerTouchEnd($event)"
  >
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {
    // 鼠标按下
    onDrawerMouseDown(e: MouseEvent) {
      console.log("MouseDown:", e.clientX, e.clientY);
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
        console.log("MouseMove:", this.moveDistanceX, this.moveDistanceY);
      }
    },
    // 鼠标松开
    onDrawerMouseUp(e: MouseEvent) {
      console.log("MouseUp");
      this.mouseDown = false;
      // this.stopTranslateByMove();
      this.moveDistanceX = 0;
      this.moveDistanceY = 0;
    },
    // 触屏按住
    onDrawerTouchStart(e: TouchEvent) {
      console.log("TouchStart:", e.touches[0].clientX, e.touches[0].clientY);
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    // 触屏拖动
    onDrawerTouchMove(e: TouchEvent) {
      this.endX = e.changedTouches[0].clientX;
      this.endY = e.changedTouches[0].clientY;
      this.moveDistanceX = this.startX - this.endX;
      this.moveDistanceY = this.startY - this.endY;
      console.log("TouchMove:", this.moveDistanceX, this.moveDistanceY);
    },
    // 触屏离开
    onDrawerTouchEnd(e: TouchEvent) {
      // this.stopTranslateByMove();
      this.moveDistanceX = 0;
      this.moveDistanceY = 0;
    },
  },
};
</script>

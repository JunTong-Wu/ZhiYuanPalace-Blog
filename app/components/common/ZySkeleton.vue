<template>
  <template v-if="type == 'text'">
    <div
      v-for="i in row"
      :key="`skeleton-text${i}`"
      class="ZySkeleton-text"
      :class="{ animation: animation }"
    ></div>
  </template>
  <template v-if="type == 'image'">
    <div
      v-for="i in row"
      :key="`skeleton-image${i}`"
      class="ZySkeleton-image"
      :class="{ animation: animation }"
    ></div>
  </template>
</template>
<script lang="ts">
  export default {
    name: 'ZySkeleton',
    props: {
      row: { type: Number, default: 1 }, // 指定行数
      type: { type: String, default: 'text' }, // 指定种类
      animation: { type: Boolean, default: true }, // 指定是否开启动画
    },
  };
</script>
<style lang="scss" scoped>
  .ZySkeleton-text {
    position: relative;
    width: 100%;
    height: 1rem;
    background-color: var(--text-5);
    border-radius: 1rem;
    margin-bottom: 0.75rem;
    overflow: hidden;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .ZySkeleton-image {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--text-5);
    margin-bottom: 0.75rem;
    overflow: hidden;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }

  .ZySkeleton-text.animation,
  .ZySkeleton-image.animation {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: loading 1.5s infinite;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0)
      );
      transform: translateX(-100%);
      z-index: 1;
    }
  }
</style>

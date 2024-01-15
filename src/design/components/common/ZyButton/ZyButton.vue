<template>
  <button
    v-if="type == 'default'"
    ref="button"
    type="button"
    h-9
    w-9
    bg="transparent dark:white/[.05] hover:bg-primary"
    text="sm"
    p-0
    m-0
    color="inherit hover:white"
    flex
    items-center
    justify-center
    rounded-full
    border="1 solid bordercolor dark:none"
    :title="title"
    @click="animation()"
  >
    <slot />
  </button>
  <button
    v-else-if="type == 'transparent'"
    ref="button"
    type="button"
    h-9
    w-9
    bg="transparent"
    text="sm"
    p-0
    m-0
    color-inherit
    flex
    items-center
    justify-center
    border="none"
    :title="title"
    @click="animation()"
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-button",
  props: {
    title: { type: String, default: "" },
    type: { type: String, default: "default" },
  },
  setup() {
    const button = ref();
    const animation = () => {
      //延迟动画
      if (button.value) {
        button.value.classList.add("animation");
        setTimeout(() => {
          button.value.classList.remove("animation");
        }, 100);
      }
    };
    return {
      button,
      animation,
    };
  },
});
</script>
<style lang="scss" scoped>
@keyframes an-bounce {
  0% {
    transition: none;
    opacity: 0.5;
    transform: scale(0.5);
  }
  15% {
    transform: scale(1.1);
  }
  30% {
    transform: scale(0.8);
  }
  45% {
    transform: scale(1);
  }
  60% {
    opacity: 1;
    transform: scale(0.94);
  }
  75% {
    transform: scale(1);
  }
  100% {
    transition: none;
  }
}

@keyframes an-click {
  0% {
    transition: none;
    opacity: 1;
    transform: scale(1);
  }
  90% {
    transform: scale(0.5);
  }
  100% {
    transition: none;
    opacity: 0.5;
    transform: scale(0.5);
  }
}

button {
  animation: an-bounce 0.7s;
  &.animation {
    animation: an-click 0.3s;
  }
}

@media (hover: hover) {
  button {
    cursor: pointer;
    transition: all 0.2s;
  }
}
</style>

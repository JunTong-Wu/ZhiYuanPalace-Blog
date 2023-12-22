<template>
  <div v-zy-ripple>
    <button
      ref="button"
      type="button"
      w-full
      h-full
      bg="transparent"
      text="sm"
      p-2
      border-0
      color-inherit
      flex
      items-center
      justify-center
      :title="title"
      @click="animation()"
    >
      <slot />
    </button>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-button",
  props: {
    title: { type: String, default: "" },
  },
  setup() {
    const button = ref();
    const animation = () => {
      console.log(button.value);

      //延迟动画
      if (button.value) {
        button.value.classList.add("animation");
        setTimeout(() => {
          button.value.classList.remove("animation");
        }, 280);
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
    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>

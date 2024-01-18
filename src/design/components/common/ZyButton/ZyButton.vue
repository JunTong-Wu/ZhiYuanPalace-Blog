<template>
  <button
    :class="{
      'zy-button-default': type == 'default',
      'zy-button-transparent': type == 'transparent',
    }"
    ref="button"
    type="button"
    min-h-9
    min-w-9
    text="sm"
    p-0
    m-0
    color="inherit"
    flex
    items-center
    justify-center
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

@keyframes an-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
  animation: an-fade-in 0.7s;
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

button.zy-button-default {
  background-color: transparent;
  border: 1px solid rgba(127, 127, 127, 0.2);
  border-radius: 9999px;
}
.dark button.zy-button-default {
  background-color: rgb(255 255 255 / 0.05);
  border: none;
}
@media (hover: hover) {
  button.zy-button-default:hover {
    background-color: var(--primary-5);
    color: white;
  }
  .mobile button.zy-button-transparent:hover {
    background-color: transparent;
    color: inherit;
  }
}

button.zy-button-transparent {
  background-color: transparent;
  border: none;
}
@media (hover: hover) {
  button.zy-button-transparent:hover {
    background-color: rgb(255 255 255 / 0.05);
  }
  .mobile button.zy-button-transparent:hover {
    background-color: transparent;
  }
}
</style>

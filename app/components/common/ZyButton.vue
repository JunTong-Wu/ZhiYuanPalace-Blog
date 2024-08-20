<template>
  <button
    :class="{
      'ZyButton-default': type == 'default',
      'ZyButton-text': type == 'text',
      'ZyButton-icon': type == 'icon',
      'ZyButton-none': type == 'none',
      'ZyButton-loading': loading,
    }"
    class="min-h-9 min-w-9 p-0 m-0 flex items-center justify-center relative"
    ref="button"
    type="button"
    :title="title"
    :disabled="loading"
    @mousedown="animationStart()"
    @mouseup="animationEnd()"
    @touchstart.passive="animationStart()"
    @touchend.passive="animationEnd()"
  >
    <span v-if="loading" class="absolute top-0 left-0 w-full h-full">
      <UIcon name="i-eos-icons-three-dots-loading" class="w-8 h-8" />
    </span>
    <span
      class="flex-1 flex items-center justify-center"
      :class="{ 'opacity-0': loading }"
    >
      <slot />
    </span>
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: "ZyButton",
  props: {
    title: { type: String, default: "" },
    type: { type: String, default: "default" },
    loading: { type: Boolean, default: false },
  },
  setup(props) {
    const button = ref();
    const animationStart = () => {
      if (button.value && !props.loading) {
        button.value.classList.add("animation");
      }
    };
    const animationEnd = () => {
      if (button.value) {
        button.value.classList.remove("animation");
      }
    };
    return {
      button,
      animationStart,
      animationEnd,
    };
  },
});
</script>
<style lang="scss" scoped>
@keyframes an-bounce {
  0% {
    transition: none;
    opacity: 0.5;
    transform: scale(0.9);
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
    transform: scale(0.9);
  }

  100% {
    transition: none;
    opacity: 0.5;
    transform: scale(0.9);
  }
}

@media screen {
  button {
    animation: an-bounce 0.7s;
    outline: none;

    &.animation {
      animation: an-click 0.3s forwards;
    }
  }
}

@media (hover: hover) {
  button {
    cursor: pointer;
    transition: all 0.2s;
  }
}

/**
* Type None
**/
button.ZyButton-none {
}

/**
* Type Default
**/
button.ZyButton-default {
  position: relative;
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background-color: var(--theme-color);
  box-shadow: 0 0.5rem 1rem rgba(var(--theme-color-rgb), 0.3);
  //border: 4px solid var(--theme-color);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, var(--theme-color-600), transparent);
    opacity: 1;
    filter: hue-rotate(30deg);
    border-radius: 1rem;
  }
  span {
    position: relative;
    z-index: 1;
  }
  &.ZyButton-loading {
    border-color: var(--text-5);
    cursor: not-allowed;
  }
}

/**
* Type Icon
**/
button.ZyButton-icon {
  background-color: transparent;
  color: inherit;
  border-radius: 0.5rem;
}

.dark button.ZyButton-icon {
  background-color: transparent;
  border: none;
}

@media (hover: hover) {
  .pc button.ZyButton-icon:hover {
    background-color: rgba(127, 127, 127, 0.2);
  }

  .pc.dark button.ZyButton-icon:hover {
    background-color: rgb(255 255 255 / 0.2);
    border: none;
  }
}

/**
* Type Text
**/
button.ZyButton-text {
  background-color: transparent;
  border: none;
  color: inherit;
}

@media (hover: hover) {
  .pc button.ZyButton-text:hover {
    color: var(--theme-color);
  }
}
</style>

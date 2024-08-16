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
      class="flex-1 flex items-center justify-center text-sm"
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
  color: var(--theme-color);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-weight: bold;
  border-radius: 9999px;
  border: 4px solid var(--theme-color);
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

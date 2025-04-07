<template>
  <button
    :class="{
      'ZyButton-default': type == 'default',
      'ZyButton-linear': type == 'linear',
      'ZyButton-text': type == 'text',
      'ZyButton-icon': type == 'icon',
      'ZyButton-none': type == 'none',
      'ZyButton-loading': loading,
      large: size == 'large',
      medium: size == 'medium',
      small: size == 'small',
    }"
    class="min-h-4 min-w-4 p-0 m-0 flex items-center justify-center relative"
    ref="button"
    type="button"
    :title="title"
    :disabled="loading || disabled"
    @mousedown="animationStart()"
    @mouseup="animationEnd()"
    @touchstart.passive="animationStart()"
    @touchend.passive="animationEnd()"
  >
    <div
      v-if="loading"
      class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <UIcon
        name="i-eos-icons-three-dots-loading"
        class="w-12 h-12"
      />
    </div>
    <span
      class="flex-1 flex items-center justify-center"
      :class="{ 'opacity-0': loading }"
    >
      <slot />
    </span>
  </button>
</template>
<script lang="ts">
  type Type = "default" | "linear" | "text" | "icon" | "none";
  type Size = "large" | "medium" | "small";
  export default defineComponent({
    name: "ZyButton",
    props: {
      title: { type: String, default: "" },
      type: { type: String as () => Type, default: "default",
      validator: (value: string) => ["default", "linear", "text", "icon", "none"].includes(value) },
      size: { type: String as () => Size, default: "medium",
      validator: (value: string) => ["large", "medium", "small"].includes(value) },
      loading: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      color: { type: String, default: "" },
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
    padding: 0.55rem 1rem;
    border-radius: var(--border-radius-sm);
    background-color: var(--theme-color);
    box-shadow: 0 0.5rem 1rem rgba(var(--theme-color-rgb), 0.3);
    border: 2px solid var(--theme-color);

    span {
      position: relative;
      z-index: 1;
    }

    &.ZyButton-loading {
      border-color: var(--text-5);
      cursor: not-allowed;
    }

    &.large {
      padding: 1rem 2rem;
    }
  }

  .dark button.ZyButton-default {
    background-color: var(--theme-color-700);
    border-color: var(--theme-color-700);
  }

  @media (hover: hover) {
    .pc button.ZyButton-default:hover {
      background-color: var(--theme-color-700);
      border-color: var(--theme-color-700);
    }
    .dark.pc button.ZyButton-default:hover {
      background-color: var(--theme-color);
      border-color: var(--theme-color);
    }
  }

  /**
* Type Linear
**/
  button.ZyButton-linear {
    position: relative;
    color: var(--theme-color);
    padding: 0.55rem 1rem;
    border-radius: var(--border-radius-sm);
    border: 2px solid var(--theme-color);

    span {
      position: relative;
      z-index: 1;
    }

    &.ZyButton-loading {
      border-color: var(--text-5);
      cursor: not-allowed;
    }

    &.large {
      padding: 1rem 2rem;
    }
  }

  .dark button.ZyButton-default {
    background-color: var(--theme-color-700);
  }

  /**
* Type Icon
**/
  button.ZyButton-icon {
    background-color: var(--bg-level-2);
    color: inherit;
    border-radius: var(--border-radius-sm);
  }

  .dark button.ZyButton-icon {
    border: none;
  }

  @media (hover: hover) {
    .pc button.ZyButton-icon:hover {
      background-color: var(--theme-color-500);
      color: white;
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

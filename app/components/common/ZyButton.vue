<template>
  <button
    :class="{
      ZyButton: true,
      'ZyButton-default': type == 'default',
      'ZyButton-linear': type == 'linear',
      'ZyButton-text': type == 'text',
      'ZyButton-icon': type == 'icon',
      loading: loading,
      large: size == 'large',
      medium: size == 'medium',
      small: size == 'small',
      disabled: disabled,
    }"
    class="min-h-4 min-w-4 p-0 m-0 flex items-center justify-center relative"
    ref="button"
    type="button"
    :title="title"
    :disabled="loading || disabled"
    :style="{
      '--color': color,
    }"
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
<script lang="ts" setup>
  import { ref } from "vue";

  type Type = "default" | "linear" | "text" | "icon";
  type Size = "large" | "medium" | "small";

  const props = defineProps({
    title: { type: String, default: "" },
    type: { type: String as () => Type, default: "default" },
    size: { type: String as () => Size, default: "medium" },
    color: { type: String, default: "var(--theme-color)" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  });

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
* Type Default
**/
  button.ZyButton-default {
    position: relative;
    color: white;
    background-color: var(--color);
    border: 2px solid var(--color);

    span {
      position: relative;
      z-index: 1;
    }

    &.large {
      font-size: 1em;
      padding: 0.8rem 1.6rem;
      border-radius: var(--border-radius-sm);
    }
    &.medium {
      font-size: 0.9em;
      padding: 0.4rem 0.8rem;
      border-radius: var(--border-radius-xs);
    }
    &.small {
      font-size: 0.7em;
      padding: 0.1rem 0.4rem;
      border-radius: var(--border-radius-2xs);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.loading {
      cursor: wait;
      opacity: 0.5;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius-sm);
      box-shadow: 0 0.5rem 1rem var(--color);
      opacity: 0.3;
    }
  }

  @media (hover: hover) {
    .pc button.ZyButton-default:hover {
      filter: brightness(1.25);
      &.disabled,
      &.loading {
        filter: brightness(1);
      }
    }
  }

  /**
* Type Linear
**/
  button.ZyButton-linear {
    position: relative;
    color: var(--color);
    border: 2px solid var(--color);

    span {
      position: relative;
      z-index: 1;
    }

    &.large {
      font-size: 1em;
      padding: 0.8rem 1.6rem;
      border-radius: var(--border-radius-sm);
    }
    &.medium {
      font-size: 0.9em;
      padding: 0.4rem 0.8rem;
      border-radius: var(--border-radius-xs);
    }
    &.small {
      font-size: 0.7em;
      padding: 0.1rem 0.4rem;
      border-radius: var(--border-radius-2xs);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.loading {
      cursor: wait;
      opacity: 0.5;
    }
  }

  @media (hover: hover) {
    .pc button.ZyButton-linear:hover {
      filter: brightness(1.25);
      &.disabled,
      &.loading {
        filter: brightness(1);
      }
    }
  }
  .dark button.ZyButton-linear {
    color: var(--text-1);
    border-color: var(--text-1);
  }

  /**
* Type Icon
**/
  button.ZyButton-icon {
    color: inherit;
    border-radius: var(--border-radius-sm);

    &.large {
      font-size: 1.5em;
      padding: 0.8rem;
    }
    &.medium {
      font-size: 1.25em;
      padding: 0.6rem;
    }
    &.small {
      font-size: 1em;
      padding: 0.4rem;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.loading {
      cursor: wait;
      opacity: 0.5;
    }
  }

  @media (hover: hover) {
    .pc button.ZyButton-icon:hover {
      background-color: var(--color);
      filter: brightness(1.25);
      color: white;
      &.disabled,
      &.loading {
        background-color: transparent;
        filter: brightness(1);
        color: inherit;
      }
    }
  }

  /**
* Type Text
**/
  button.ZyButton-text {
    background-color: transparent;
    border: none;
    color: inherit;

    &.large {
      font-size: 1.2em;
    }
    &.medium {
      font-size: 1em;
    }
    &.small {
      font-size: 0.8em;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.loading {
      cursor: wait;
      opacity: 0.5;
    }
  }

  @media (hover: hover) {
    .pc button.ZyButton-text:hover {
      color: var(--color);
      filter: brightness(1.25);
      &.disabled,
      &.loading {
        color: inherit;
        filter: brightness(1);
      }
    }
  }
</style>

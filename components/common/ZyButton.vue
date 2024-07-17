<template>
  <button
    :class="{
      'ZyButton-default': type == 'default',
      'ZyButton-transparent': type == 'transparent',
      'ZyButton-icon': type == 'icon',
      'ZyButton-primary': type == 'primary',
    }"
    class="min-h-9 min-w-9 text-base p-0 m-0 flex items-center justify-center"
    ref="button"
    type="button"
    color="inherit"
    :title="title"
    @mousedown="animationStart()"
    @mouseup="animationEnd()"
    @touchstart.passive="animationStart()"
    @touchend.passive="animationEnd()"
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: "ZyButton",
  props: {
    title: { type: String, default: "" },
    type: { type: String, default: "default" },
  },
  setup() {
    const button = ref();
    const animationStart = () => {
      if (button.value) {
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
* Type Default
**/
button.ZyButton-default {
  background-color: var(--bg-card);
  color: inherit;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 9999px;
  border: none;
  box-shadow: 5px 5px 10px var(--bg-mask), inset 2px 2px 6px var(--bg-card),
    inset -5px -5px 10px var(--bg-card);
}

@media (hover: hover) {
  .pc button.ZyButton-default:hover {
    background-color: var(--primary-5);
    color: white;
    box-shadow: 5px 5px 10px var(--bg-mask), inset 2px 2px 6px var(--primary-7),
      inset -5px -5px 10px var(--primary-7);
  }
}

/**
* Type Primary
**/
button.ZyButton-primary {
  background-color: var(--primary-5);
  color: white;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 9999px;
  border: none;
  box-shadow: 5px 5px 10px rgba(108, 106, 212, 0.25),
    inset 2px 2px 6px var(--primary-6), inset -5px -5px 10px var(--primary-6);
}

@media (hover: hover) {
  .pc button.ZyButton-primary:hover {
    background-color: var(--primary-6);
    color: white;
    box-shadow: 5px 5px 10px rgba(108, 106, 212, 0.25),
      inset 2px 2px 6px var(--primary-7), inset -5px -5px 10px var(--primary-7);
  }
}

/**
* Type Icon
**/
button.ZyButton-icon {
  background-color: rgb(255 255 255 / 0.5);
  color: inherit;
  border: 1px solid rgba(127, 127, 127, 0.2);
  border-radius: 9999px;
}

.dark button.ZyButton-icon {
  background-color: rgb(255 255 255 / 0.05);
  border: none;
}

@media (hover: hover) {
  .pc button.ZyButton-icon:hover {
    background-color: var(--theme-color);
    color: white;
  }

  .pc .dark button.ZyButton-icon:hover {
    background-color: rgb(255 255 255 / 0.2);
    border: none;
  }
}

/**
* Type Transparent
**/
button.ZyButton-transparent {
  background-color: transparent;
  border: none;
  color: inherit;
}

@media (hover: hover) {
  .pc button.ZyButton-transparent:hover {
    background-color: rgb(255 255 255 / 0.05);
  }
}
</style>

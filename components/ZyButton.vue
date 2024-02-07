<template>
  <button
    :class="{
      'zy-button-default': type == 'default',
      'zy-button-transparent': type == 'transparent',
      'zy-button-icon': type == 'icon',
      'zy-button-primary': type == 'primary',
    }"
    ref="button"
    type="button"
    min-h-9
    min-w-9
    text="base"
    p-0
    m-0
    color="inherit"
    flex
    items-center
    justify-center
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
  name: "zy-button",
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
button.zy-button-default {
  background-color: var(--bg-4);
  color: var(--text-1);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 9999px;
  border: none;
  box-shadow: 5px 5px 10px var(--bg-mask), inset 2px 2px 6px var(--bg-5),
    inset -5px -5px 10px var(--bg-5);
}
@media (hover: hover) {
  .pc button.zy-button-default:hover {
    background-color: var(--primary-5);
    color: white;
    box-shadow: 5px 5px 10px var(--bg-mask), inset 2px 2px 6px var(--primary-7),
      inset -5px -5px 10px var(--primary-7);
  }
}

/**
* Type Primary
**/
button.zy-button-primary {
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
  .pc button.zy-button-primary:hover {
    background-color: var(--primary-6);
    color: white;
    box-shadow: 5px 5px 10px rgba(108, 106, 212, 0.25),
      inset 2px 2px 6px var(--primary-7), inset -5px -5px 10px var(--primary-7);
  }
}

/**
* Type Icon
**/
button.zy-button-icon {
  background-color: rgb(255 255 255 / 0.5);
  border: 1px solid rgba(127, 127, 127, 0.2);
  border-radius: 9999px;
}
.dark button.zy-button-icon {
  background-color: rgb(255 255 255 / 0.05);
  border: none;
}
@media (hover: hover) {
  .pc button.zy-button-icon:hover {
    background-color: var(--primary-5);
    color: white;
  }
}

/**
* Type Transparent
**/
button.zy-button-transparent {
  background-color: transparent;
  border: none;
}
@media (hover: hover) {
  .pc button.zy-button-transparent:hover {
    background-color: rgb(255 255 255 / 0.05);
  }
}
</style>

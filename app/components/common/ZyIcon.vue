<template>
  <div
    :class="{ activated: activated }"
    :style="{ '--size': size, width: size, height: size }"
    class="ZyIcon relative"
  >
    <div
      v-if="defaultName"
      :style="{
        '--icon-color': defaultLinearGradient ? 'inherit' : defaultColor,
      }"
      class="icon-default flex"
    >
      <UIcon :name="defaultName" />
    </div>
    <div
      v-if="activatedName"
      :style="{
        '--icon-color': activatedLinearGradient ? 'inherit' : activatedColor,
      }"
      class="icon-activated flex"
    >
      <UIcon :name="activatedName" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  interface LinearGradient {
    direction: "bottom" | "top" | "left" | "right";
    from: string;
    to: string;
  }

  const props = defineProps({
    size: {
      type: String,
      default: "1rem",
    },
    defaultName: {
      type: String,
      default: "",
    },
    defaultColor: {
      type: String,
      default: "inherit",
    },
    activatedName: {
      type: String,
      default: "",
    },
    activatedColor: {
      type: String,
      default: "inherit",
    },
    activated: {
      type: Boolean,
      default: false,
    },
    defaultLinearGradient: {
      type: Object as () => LinearGradient | null,
      default: null,
    },
    activatedLinearGradient: {
      type: Object as () => LinearGradient | null,
      default: null,
    },
  });
</script>
<style lang="scss">
  .ZyIcon {
    svg {
      width: var(--size);
      height: var(--size);
      font-size: var(--size);
      color: var(--icon-color);
    }

    > div {
      position: absolute;
      top: 0;
      transition: opacity 0.3s ease;

      > span {
        display: block;
        width: var(--size);
        height: var(--size);
        color: var(--icon-color);
      }
    }

    > div.icon-default {
      opacity: 1;
    }

    > div.icon-activated {
      opacity: 0;
    }

    &.activated {
      > div.icon-default {
        opacity: 0;
      }

      > div.icon-activated {
        opacity: 1;
      }
    }
  }
</style>

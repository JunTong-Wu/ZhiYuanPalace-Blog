<template>
  <div relative class="ZyIcon" :class="{ activated: activated }" :style="{ '--size': size, width: size, height: size }">
    <div v-html="defaultIcon" flex :style="{ '--icon-color': defaultColor }"></div>
    <div v-html="activatedIcon" flex :style="{ '--icon-color': activatedColor }"></div>
  </div>
</template>
<script lang="ts">

export default defineComponent({
  name: "ZyIcon",
  props: {
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
  },
  setup(props) {
    const defaultIcon = getSvgByName(props.defaultName);
    const activatedIcon = getSvgByName(props.activatedName);
    return {
      props,
      defaultIcon,
      activatedIcon,
    };
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

  >div {
    position: absolute;
    top: 0;
  }

  >div:first-of-type {
    opacity: 1;
  }

  >div:nth-of-type(2) {
    opacity: 0;
  }

  &.activated {
    >div:first-of-type {
      opacity: 0;
    }

    >div:nth-of-type(2) {
      opacity: 1;
    }
  }
}
</style>

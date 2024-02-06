<template>
  <div
    relative
    class="zy-icon"
    :class="{ filled: filled }"
    :style="{ '--size': size, width: size, height: size }"
  >
    <div v-html="lineIcon" flex :style="{ '--icon-color': lineColor }"></div>
    <div
      v-html="filledIcon"
      flex
      :style="{ '--icon-color': filledColor }"
    ></div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-icon",
  props: {
    size: {
      type: String,
      default: "1rem",
    },
    lineName: {
      type: String,
      default: "",
    },
    lineColor: {
      type: String,
      default: "inherit",
    },
    filledName: {
      type: String,
      default: "",
    },
    filledColor: {
      type: String,
      default: "inherit",
    },
    filled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const lineIcon = getSvgByName(props.lineName);
    const filledIcon = getSvgByName(props.filledName);
    return {
      props,
      lineIcon,
      filledIcon,
    };
  },
});
</script>
<style lang="scss">
.zy-icon {
  svg {
    width: var(--size);
    height: var(--size);
    font-size: var(--size);
    color: var(--icon-color);
  }
  > div {
    position: absolute;
    top: 0;
  }
  > div:first-of-type {
    opacity: 1;
  }
  > div:nth-of-type(2) {
    opacity: 0;
  }
  &.filled {
    > div:first-of-type {
      opacity: 0;
    }
    > div:nth-of-type(2) {
      opacity: 1;
    }
  }
}
</style>

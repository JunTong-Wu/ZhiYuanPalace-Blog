<template>
  <div
    overflow-hidden
    relative
    :style="{ width: size, height: size }"
    class="zy-icon"
    :class="{ filled: filled }"
  >
    <img
      absolute
      inset-0
      :src="getSvgIconUrl(`${name}Regular`)"
      :style="{
        width: size,
        height: size,
        color: color,
        filter: `drop-shadow(currentColor ${size} 0)`,
        transform: `translateX(-${size})`,
      }"
    />
    <img
      absolute
      inset-0
      :src="getSvgIconUrl(`${name}Filled`)"
      :style="{
        width: size,
        height: size,
        color: filledColor,
        filter: `drop-shadow(currentColor ${size} 0)`,
        transform: `translateX(-${size})`,
      }"
    />
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-icon",
  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "1rem",
    },
    color: {
      type: String,
      default: "inherit",
    },
    filled: {
      type: Boolean,
      default: false,
    },
    filledColor: {
      type: String,
      default: "inherit",
    },
  },
  setup(props) {
    const getSvgIconUrl = (name: string): string => {
      const url = `/static/svg/icon/fluent/${name}.svg`;
      return url;
    };
    return {
      props,
      getSvgIconUrl,
    };
  },
});
</script>
<style lang="scss" scoped>
.zy-icon {
  > img:first-of-type {
    opacity: 1;
  }
  > img:nth-of-type(2) {
    opacity: 0;
  }
  &.filled {
    > img:first-of-type {
      opacity: 0;
    }
    > img:nth-of-type(2) {
      opacity: 1;
    }
  }
}
</style>

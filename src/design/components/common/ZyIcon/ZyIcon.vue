<template>
  <div
    overflow-hidden
    relative
    :style="{ width: size, height: size }"
    class="zy-icon"
    :class="{ filled: filled }"
  >
    <inline-svg
      absolute
      inset-0
      :src="getSvgIconUrl(`${name}Regular`)"
      :style="{ color: color }"
    />
    <inline-svg
      absolute
      inset-0
      :src="getSvgIconUrl(`${name}Filled`)"
      :style="{ color: filledColor }"
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
    const path = ref("");
    const getSvgIconUrl = (name: string) => {
      const url = `/_nuxt/node_modules/@sicons/fluent/${name}.svg`;
      return url;
    };
    getSvgIconUrl(props.name);
    return {
      props,
      getSvgIconUrl,
      path,
    };
  },
});
</script>
<style lang="scss" scoped>
.zy-icon {
  > svg:first-of-type {
    opacity: 1;
  }
  > svg:nth-of-type(2) {
    opacity: 0;
  }
  &.filled {
    > svg:first-of-type {
      opacity: 0;
    }
    > svg:nth-of-type(2) {
      opacity: 1;
    }
  }
}
</style>

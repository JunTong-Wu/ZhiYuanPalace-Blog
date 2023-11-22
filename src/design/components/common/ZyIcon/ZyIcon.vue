<template>
  <div overflow-hidden :style="{ width: size, height: size }">
    <img
      v-if="!activateFlag"
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
      v-else
      :src="getSvgIconUrl(`${name}Filled`)"
      :style="{
        width: size,
        height: size,
        color: activateColor,
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
    activateFlag: {
      type: Boolean,
      default: false,
    },
    activateColor: {
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

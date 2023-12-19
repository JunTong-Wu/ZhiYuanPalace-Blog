<template>
  <div
    overflow-hidden
    relative
    :style="{ width: size, height: size }"
    class="zy-icon"
    :class="{ filled: filled }"
  >
    <Icon
      absolute
      inset-0
      :name="lineName"
      :size="size"
      :style="{ color: lineColor }"
    />
    <Icon
      absolute
      inset-0
      :name="filledName"
      :size="size"
      :style="{ color: filledColor }"
    />
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
    return {
      props,
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

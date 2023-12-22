<template>
  <button
    type="button"
    bg-transparent
    text-sm
    border-0
    color-text-1
    @click="$router.replace(to)"
    flex
    items-center
    justify-center
    :title="title"
  >
    <slot />
  </button>
</template>
to
<script lang="ts">
export default defineComponent({
  name: "zy-link",
  props: {
    to: {
      type: String,
      default: "",
    },
    title: { type: String, default: "" },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
<style lang="scss" scoped>
@media (hover: hover) {
  button {
    cursor: pointer;
  }
}
</style>

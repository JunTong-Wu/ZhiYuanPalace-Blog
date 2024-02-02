<template>
  <a
    :href="to"
    bg-transparent
    text-base
    border-0
    color-text-1
    @click.prevent="$router.replace(to)"
    flex
    items-center
    justify-center
    no-underline
    :title="title"
  >
    <slot />
  </a>
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

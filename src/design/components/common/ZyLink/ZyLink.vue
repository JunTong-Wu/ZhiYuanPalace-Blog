<template>
  <button
    type="button"
    v-zy-ripple
    un-bg="transparent"
    un-text="sm"
    un-border="0"
    un-color="text-1 dark:text-dark-1"
    @click="$router.replace(to)"
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
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

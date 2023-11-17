<template>
  <button
    type="button"
    v-zy-ripple
    bg-transparent
    text-sm
    border-0
    color="text-1 dark:text-dark-1"
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

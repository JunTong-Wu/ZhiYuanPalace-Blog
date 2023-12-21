<template>
  <button
    type="button"
    v-zy-ripple
    bg="transparent"
    text="sm"
    p-2
    border-0
    color-inherit
    :title="title"
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-button",
  props: {
    title: { type: String, default: "" },
  },
});
</script>

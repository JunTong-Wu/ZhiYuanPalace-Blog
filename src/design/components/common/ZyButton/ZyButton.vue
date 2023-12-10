<template>
  <button
    type="button"
    v-zy-ripple
    bg="transparent"
    text="sm"
    p-2
    border-0
    color-inherit
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-button",
});
</script>
<style scoped>
button {
  font-family: inherit;
  cursor: pointer;
}
</style>

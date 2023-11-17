<template>
  <button
    type="button"
    v-zy-ripple
    bg="primary-6 active:primary-7"
    text="sm white"
    p-2
    border-0
    rounded-lg
    transition-colors
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-button",
});
</script>

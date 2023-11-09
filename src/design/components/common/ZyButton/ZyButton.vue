<template>
  <button
    type="button"
    v-zy-ripple
    un-bg="primary-6 active:primary-7"
    un-text="sm white"
    un-font="mono light"
    un-p="2"
    un-border="0"
    un-rounded="lg"
    un-transition="colors"
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-button",
});
</script>

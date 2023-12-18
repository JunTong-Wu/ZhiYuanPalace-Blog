<template>
  <header position-fixed top-0 left-0 right-0 h-header z-20>
    <slot />
  </header>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-header",
});
</script>

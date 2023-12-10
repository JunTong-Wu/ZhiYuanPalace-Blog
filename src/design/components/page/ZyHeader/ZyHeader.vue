<template>
  <div position-fixed top-0 left-0 right-0 h-header z-20>
    <slot />
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-header",
});
</script>

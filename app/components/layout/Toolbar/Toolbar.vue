<template>
  <ClientOnly>
    <Teleport to="#zy-tool-bar">
      <div
        id="zy-tool-bar-inner"
        class="absolute inset-6"
      >
        <slot />
      </div>
    </Teleport>
  </ClientOnly>
</template>
<script setup lang="ts">
  import "./transition.scss";
</script>

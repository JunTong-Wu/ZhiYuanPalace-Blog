<template>
  <ClientOnly>
    <Teleport to="#zy-tool-bar">
      <div
        id="zy-tool-bar-innner"
        class="absolute inset-4"
      >
        <slot />
      </div>
    </Teleport>
  </ClientOnly>
</template>
<script setup lang="ts">
  import './transition.scss';
</script>

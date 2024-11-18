<template>
  <Teleport to="#zy-tool-bar">
    <div id="zy-tool-bar-innner" class="absolute top-8 bottom-0 w-full pr-4 pl-4">
      <slot />
    </div>
  </Teleport>
</template>
<script setup lang="ts"></script>

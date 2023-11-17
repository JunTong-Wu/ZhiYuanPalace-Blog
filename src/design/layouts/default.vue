<template>
  <div h-full>
    <zy-header>
      <zy-button @click="darkModeSwitch">Dark Mode</zy-button>
    </zy-header>
    <slot />
    <zy-bottom-navigation>
      <zy-link to="/" h-full>Home</zy-link>
      <zy-link to="/text" h-full>Text</zy-link>
      <zy-link to="/multi-media" h-full>Media</zy-link>
    </zy-bottom-navigation>
  </div>
</template>
<script setup lang="ts">
const darkModeSwitch = () => {
  if (!document.documentElement.classList.contains("dark")) {
    //切换主题
    document.documentElement.classList.add("dark");
  } else {
    //切换主题
    document.documentElement.classList.remove("dark");
  }
};
</script>

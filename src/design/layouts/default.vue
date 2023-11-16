<template>
  <div un-h="full">
    <zy-button @click="darkModeSwitch">Dark Mode</zy-button>
    <zy-bottom-navigation>
      <zy-link to="/" un-h="full">HOME</zy-link>
      <zy-link to="/text" un-h="full">TEXT</zy-link>
      <zy-link to="/multi-media" un-h="full">Media</zy-link>
    </zy-bottom-navigation>
    <slot />
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

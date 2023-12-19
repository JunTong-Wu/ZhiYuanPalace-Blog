<template>
  <nav>
    <ul class="flex h-full items-center">
      <li h-full>
        <zy-link to="/" h-full px-6 :class="{ activate: routerActivate('/') }"
          >首页</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          to="/text"
          h-full
          px-6
          :class="{ activate: routerActivate('/text') }"
          >文字</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          to="/media"
          h-full
          px-6
          :class="{ activate: routerActivate('/media') }"
          >媒体</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          to="/about"
          h-full
          px-6
          :class="{ activate: routerActivate('/about') }"
          >关于</zy-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const routerActivate = (path: string) => {
  if (route.path == path) {
    return true;
  } else {
    return false;
  }
};
</script>

<style lang="scss" scoped>
.activate {
  font-weight: bold;
}
</style>

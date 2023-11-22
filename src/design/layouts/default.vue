<template>
  <div h-full>
    <zy-header>
      <zy-button @click="darkModeSwitch">Dark Mode</zy-button>
    </zy-header>
    <slot />
    <zy-bottom-navigation>
      <zy-link to="/" h-full px-4>
        <ZyIcon name="Home20" :activate-flag="routerActivate('/')" />
      </zy-link>
      <zy-link to="/text" h-full px-4>
        <ZyIcon name="Book20" :activate-flag="routerActivate('/text')" />
      </zy-link>
      <zy-link to="/media" h-full px-4>
        <ZyIcon name="Video20" :activate-flag="routerActivate('/media')" />
      </zy-link>
    </zy-bottom-navigation>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

const darkModeSwitch = () => {
  if (!document.documentElement.classList.contains("dark")) {
    //切换主题
    document.documentElement.classList.add("dark");
  } else {
    //切换主题
    document.documentElement.classList.remove("dark");
  }
};
const routerActivate = (path: string) => {
  if (route.path == path) {
    return true;
  } else {
    return false;
  }
};
</script>

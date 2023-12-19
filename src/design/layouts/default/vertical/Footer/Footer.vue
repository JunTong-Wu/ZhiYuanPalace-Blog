<template>
  <zy-bottom-navigation backdrop-blur-xl>
    <div
      h-full
      flex
      w="full xs:[80%] sm:[70%] md:[60%] lg:[50%] xl:[40%]"
      mx-auto
    >
      <zy-link to="/" h-full w="[20%]">
        <ZyIcon
          lineName="ant-design:home-outlined"
          lineColor="var(--text-3)"
          filledName="ant-design:home-twotone"
          filled-color="var(--text-1)"
          :filled="routerActivate('/')"
        />
      </zy-link>
      <zy-link to="/text" h-full w="[20%]">
        <ZyIcon
          lineName="ph:article"
          lineColor="var(--text-3)"
          filledName="ph:article-duotone"
          filled-color="var(--text-1)"
          :filled="routerActivate('/text')"
        />
      </zy-link>
      <div h-full w="[20%]"></div>
      <zy-link to="/media" h-full w="[20%]">
        <ZyIcon
          lineName="ic:outline-audio-file"
          lineColor="var(--text-3)"
          filledName="ic:twotone-audio-file"
          filled-color="var(--text-1)"
          :filled="routerActivate('/media')"
        />
      </zy-link>
      <zy-link to="/about" h-full w="[20%]">
        <ZyIcon
          lineName="ph:user"
          lineColor="var(--text-3)"
          filledName="ph:user-duotone"
          filled-color="var(--text-1)"
          :filled="routerActivate('/about')"
        />
      </zy-link>
    </div>
  </zy-bottom-navigation>
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

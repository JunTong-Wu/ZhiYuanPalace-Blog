<template>
  <zy-bottom-navigation backdrop-blur-xl>
    <div
      h-full
      flex
      w="full xs:[80%] sm:[70%] md:[60%] lg:[50%] xl:[40%]"
      mx-auto
    >
      <zy-link to="/" v-zy-ripple h-full w="[20%]" title="首页">
        <ZyIcon
          lineName="solar:home-smile-angle-linear"
          lineColor="var(--text-3)"
          filledName="solar:home-smile-angle-bold-duotone"
          filled-color="var(--text-1)"
          :filled="routerActivate('/')"
        />
      </zy-link>
      <zy-link to="/text" v-zy-ripple h-full w="[20%]" title="文字">
        <ZyIcon
          lineName="solar:bookmark-square-minimalistic-linear"
          lineColor="var(--text-3)"
          filledName="solar:bookmark-square-minimalistic-bold-duotone"
          filled-color="var(--text-1)"
          :filled="routerActivate('/text')"
        />
      </zy-link>
      <div h-full w="[20%]"></div>
      <zy-link to="/media" v-zy-ripple h-full w="[20%]" title="媒体">
        <ZyIcon
          lineName="solar:video-library-linear"
          lineColor="var(--text-3)"
          filledName="solar:video-library-bold-duotone"
          filled-color="var(--text-1)"
          :filled="routerActivate('/media')"
        />
      </zy-link>
      <zy-link to="/about" v-zy-ripple h-full w="[20%]" title="关于">
        <ZyIcon
          lineName="solar:user-linear"
          lineColor="var(--text-3)"
          filledName="solar:user-bold-duotone"
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

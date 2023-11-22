<template>
  <zy-bottom-navigation>
    <div h-full flex w="full xs:[80%] sm:[70%] md:[60%] lg:[50%] xl:[40%]">
      <zy-link to="/" h-full w="[20%]">
        <ZyIcon
          name="Home12"
          size="1.25rem"
          filled-color="#686ae5"
          :filled="routerActivate('/')"
        />
      </zy-link>
      <zy-link to="/text" h-full w="[20%]">
        <ZyIcon
          name="Notepad12"
          size="1.25rem"
          filled-color="#686ae5"
          :filled="routerActivate('/text')"
        />
      </zy-link>
      <div h-full w="[20%]"></div>
      <zy-link to="/media" h-full w="[20%]">
        <ZyIcon
          name="ChannelShare12"
          size="1.25rem"
          filled-color="#686ae5"
          :filled="routerActivate('/media')"
        />
      </zy-link>
      <zy-link to="/about" h-full w="[20%]">
        <ZyIcon
          name="Person12"
          size="1.25rem"
          filled-color="#686ae5"
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

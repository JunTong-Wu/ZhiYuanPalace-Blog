<template>
  <zy-bottom-navigation backdrop-blur-xl>
    <div
      h-full
      flex
      w="full xs:[80%] sm:[70%] md:[60%] lg:[50%] xl:[40%]"
      mx-auto
    >
      <zy-link
        :to="`/${locale}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('home')"
      >
        <ZyIcon
          lineName="solar:home-smile-angle-linear"
          lineColor="var(--text-3)"
          filledName="solar:home-smile-angle-bold-duotone"
          :filled="routerActivate('/')"
        />
      </zy-link>
      <zy-link
        :to="`${localePath({ name: 'text' })}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('text')"
      >
        <ZyIcon
          lineName="solar:bookmark-square-minimalistic-linear"
          lineColor="var(--text-3)"
          filledName="solar:bookmark-square-minimalistic-bold-duotone"
          :filled="routerActivate('/text')"
        />
      </zy-link>
      <div h-full w="[20%]"></div>
      <zy-link
        :to="`${localePath({ name: 'media' })}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('media')"
      >
        <ZyIcon
          lineName="solar:video-library-linear"
          lineColor="var(--text-3)"
          filledName="solar:video-library-bold-duotone"
          :filled="routerActivate('/media')"
        />
      </zy-link>
      <zy-link
        :to="`${localePath({ name: 'about' })}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('about')"
      >
        <ZyIcon
          lineName="solar:user-linear"
          lineColor="var(--text-3)"
          filledName="solar:user-bold-duotone"
          :filled="routerActivate('/about')"
        />
      </zy-link>
    </div>
  </zy-bottom-navigation>
</template>
<script setup lang="ts">
const route = useRoute();
const localePath = useLocalePath();
const { locale } = useI18n();
const routerActivate = (path: string) => {
  if (path != "/") {
    if (route.path.includes(path)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (route.path == "/" || route.path == `/${locale.value}`) {
      return true;
    }
  }
};
</script>

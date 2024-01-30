<template>
  <zy-bottom-navigation bg="bg-5">
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
          lineName="solar:home-smile-linear"
          lineColor="var(--text-3)"
          filledName="solar:home-smile-bold"
          :filled="routerActivate('/')"
        />
      </zy-link>
      <zy-link
        :to="`${localePath({ name: 'article' })}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('article')"
      >
        <ZyIcon
          lineName="solar:notebook-minimalistic-linear"
          lineColor="var(--text-3)"
          filledName="solar:notebook-minimalistic-bold"
          :filled="routerActivate('/article')"
        />
      </zy-link>
      <zy-link
        :to="`${localePath({ name: 'shuoshuo' })}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('shuoshuo')"
      >
        <ZyIcon
          lineName="solar:star-linear"
          lineColor="var(--text-3)"
          filledName="solar:star-bold"
          :filled="routerActivate('/shuoshuo')"
        />
      </zy-link>
      <zy-link
        :to="`${localePath({ name: 'photo' })}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('photo')"
      >
        <ZyIcon
          lineName="solar:album-linear"
          lineColor="var(--text-3)"
          filledName="solar:album-bold"
          :filled="routerActivate('/photo')"
        />
      </zy-link>
      <zy-link
        :to="`${localePath({ name: 'video' })}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t('video')"
      >
        <ZyIcon
          lineName="solar:videocamera-linear"
          lineColor="var(--text-3)"
          filledName="solar:videocamera-bold"
          :filled="routerActivate('/video')"
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

<template>
  <nav class="zy-navigation">
    <ul class="flex h-full items-center">
      <li h-full>
        <zy-link
          :to="`/${locale}`"
          h-full
          px-5
          :title="$t('home')"
          :class="{ activate: routerActivate('/') }"
          >{{ $t("home") }}</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          :to="`${localePath({ name: 'article' })}`"
          h-full
          px-5
          :title="$t('article')"
          :class="{ activate: routerActivate('/article') }"
          >{{ $t("article") }}</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          :to="`${localePath({ name: 'shuoshuo' })}`"
          h-full
          px-5
          :title="$t('shuoshuo')"
          :class="{ activate: routerActivate('/shuoshuo') }"
          >{{ $t("shuoshuo") }}</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          :to="`${localePath({ name: 'photo' })}`"
          h-full
          px-5
          :title="$t('photo')"
          :class="{ activate: routerActivate('/photo') }"
          >{{ $t("photo") }}</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          :to="`${localePath({ name: 'video' })}`"
          h-full
          px-5
          :title="$t('video')"
          :class="{ activate: routerActivate('/video') }"
          >{{ $t("video") }}</zy-link
        >
      </li>
    </ul>
  </nav>
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

<style lang="scss" scoped>
@keyframes an-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.zy-navigation {
  animation: an-fade-in 0.7s;
}

.activate {
  color: var(--primary-6);
}
</style>

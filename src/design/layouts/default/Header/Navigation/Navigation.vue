<template>
  <nav>
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
          :to="`${localePath({ name: 'text' })}`"
          h-full
          px-5
          :title="$t('text')"
          :class="{ activate: routerActivate('/text') }"
          >{{ $t("text") }}</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          :to="`${localePath({ name: 'media' })}`"
          h-full
          px-5
          :title="$t('media')"
          :class="{ activate: routerActivate('/media') }"
          >{{ $t("media") }}</zy-link
        >
      </li>
      <li h-full>
        <zy-link
          :to="`${localePath({ name: 'about' })}`"
          h-full
          px-5
          :title="$t('about')"
          :class="{ activate: routerActivate('/about') }"
          >{{ $t("about") }}</zy-link
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
.activate {
  color: var(--primary-6);
}
</style>

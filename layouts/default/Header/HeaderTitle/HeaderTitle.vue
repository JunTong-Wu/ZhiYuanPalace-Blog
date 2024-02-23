<template>
  <div w-20>
    <h1 class="header-title" text-base font-normal ml-2 my-0 v-if="titleDisable">
      {{ $t(title) }}
    </h1>
  </div>
</template>
<script setup lang="ts">
// 标题
const route = useRoute();
const path = route.fullPath;
const title = ref("empty");
title.value = getMobileTitle(path);
const router = useRouter();
const titleDisable = ref(true);

router.beforeEach((to, from, next) => {
  titleDisable.value = false;
  next();
  setTimeout(() => {
    title.value = getMobileTitle(to.fullPath);
    titleDisable.value = true;
  }, 200);
});
</script>
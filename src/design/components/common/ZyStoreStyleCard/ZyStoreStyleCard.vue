<template>
  <zy-link :to="goLink" w-full h-full justify-center>GO 1</zy-link>
</template>
<script setup lang="ts">
const { locale } = useI18n();
const goLink = `/${locale.value}/article/1`;
const router = useRouter();
onMounted(() => {
  router.beforeEach((to, from, next) => {
    if (to.fullPath == goLink) {
      console.log(true);
    } else {
      next();
    }
  });
});
</script>

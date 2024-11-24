<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" class="hidden-scrollbar-x">

    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    </Html>
    <ZySuperResponsive>
      <AdminLayout v-if="isAdminPage">
        <NuxtPage class="nuxt-page mx-auto min-h-screen" />
      </AdminLayout>
      <div v-else-if="isLoginPage">
        <NuxtPage class="nuxt-page mx-auto min-h-screen" />
      </div>
      <Layout v-else>
        <NuxtPage class="nuxt-page mx-auto min-h-screen" />
      </Layout>
    </ZySuperResponsive>
    <ClientOnly>
      <Live2D />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import "@/assets/css/style.scss";

// 多语言
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const route = useRoute();
const isAdminPage = ref(false);
const isLoginPage = ref(false);
// 监听路由变化，切换布局
watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith("/admin")) {
      isAdminPage.value = true;
    } else if (newPath.startsWith("/login")) {
      isLoginPage.value = true;
    } else {
      isAdminPage.value = false;
      isLoginPage.value = false;
    }
  },
  { immediate: true }
);

// head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 知鸢宫` : "知鸢宫";
  },
});

const queueStore = store.useQueueStore()
onMounted(() => {
  // 全局执行队列中的所有函数
  queueStore.executeQueue()
})
</script>
<style lang="scss">
.nuxt-page {
  will-change: transform;
}

.page-article-details .nuxt-page {
  padding-bottom: 0;
}

@media (pointer: fine) {
  /* 使用鼠标或手写笔 */
}

@media (pointer: coarse) {
  /* 使用触摸屏 */
}

@media (hover: hover) {
  /* 可以hover */
}

@media (hover: none) {
  /* 不可以hover */
}
</style>

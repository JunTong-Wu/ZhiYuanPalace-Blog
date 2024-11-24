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
      <Layout>
        <NuxtPage class="nuxt-page mx-auto" :class="{ 'min-h-screen': !isSimpleLayout() }" />
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
const router = useRouter();
const isSimpleLayout = () => {
  if (route.meta) {
    return route.meta.layout === 'admin'
  }
  return false
};

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

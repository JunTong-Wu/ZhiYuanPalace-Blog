<template>
  <div>
    <Html
      :lang="head.htmlAttrs.lang"
      :dir="head.htmlAttrs.dir"
      class="hidden-scrollbar-x"
    >
      <Head>
        <template
          v-for="link in head.link"
          :key="link.id"
        >
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template
          v-for="meta in head.meta"
          :key="meta.id"
        >
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
    </Html>
    <ZySuperResponsive>
      <Layout
        :isLoginLayout="isLoginPage"
        :isAdminLayout="isAdminPage"
        :isVideoDetailLayout="isVideoDetailPage"
        :isDocumentLayout="isDocumentPage"
      >
        <NuxtPage class="nuxt-page mx-auto min-h-screen" />
      </Layout>
    </ZySuperResponsive>
    <ClientOnly>
      <Live2D
        :hide="
          isAdminPage || isLoginPage || isVideoDetailPage || isDocumentPage
        "
      />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
  import "@/assets/css/style.scss";

  useHead({
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css",
      },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js",
        // 有效选项为：'head' | 'bodyClose' | 'bodyOpen'
        tagPosition: "head",
      },
    ],
  });

  // 多语言
  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: "id",
    addSeoAttributes: true,
  });

  const route = useRoute();
  const isAdminPage = ref(false);
  const isLoginPage = ref(false);
  const isVideoDetailPage = ref(false);
  const isDocumentPage = ref(false);
  // 监听路由变化，切换布局
  watch(
    () => route.path,
    (newPath) => {
      if (newPath.startsWith("/admin")) {
        isAdminPage.value = true;
        isLoginPage.value = false;
        isDocumentPage.value = false;
      } else if (newPath.startsWith("/login")) {
        isAdminPage.value = false;
        isLoginPage.value = true;
        isDocumentPage.value = false;
      } else if (newPath.startsWith("/doc")) {
        isAdminPage.value = false;
        isLoginPage.value = false;
        isDocumentPage.value = true;
      } else {
        isAdminPage.value = false;
        isLoginPage.value = false;
        isDocumentPage.value = false;
      }

      if (newPath.includes("/audio/video/")) {
        isVideoDetailPage.value = true;
      } else {
        isVideoDetailPage.value = false;
      }
    },
    { immediate: true },
  );
  const { t } = useI18n();

  // head
  useHead({
    titleTemplate: () => {
      const title = t(`menu.${String(route.name)}`);
      return route.path !== "/" ? `${title} - 知鸢宫` : "知鸢宫";
    },
  });

  const queueStore = store.useQueueStore();
  onMounted(() => {
    // 全局执行队列中的所有函数
    queueStore.executeQueue();
  });
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

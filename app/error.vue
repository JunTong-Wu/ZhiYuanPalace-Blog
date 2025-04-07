<template>
  <div>
    <ZySuperResponsive>
      <Layout
        :isLoginLayout="isLoginPage"
        :isAdminLayout="isAdminPage"
        :isVideoDetailLayout="isVideoDetailPage"
      >
        <div class="nuxt-page mx-auto min-h-screen">
          <CommonMainSection>
            <!--            <p>statusCode: {{ error.statusCode }}</p>-->
            <!--            <p>statusMessage: {{ error.statusMessage || "&#45;&#45;" }}</p>-->

            <h1 class="text-center text-3xl font-bold mb-8">
              Error {{ error.statusCode }}
            </h1>
            <UCard>
              <template #header>
                <p>message: {{ error.message }}</p>
              </template>
              <div v-html="error.stack"></div>
              <template #footer>
                <p class="text-end">url: {{ error.url }}</p>
              </template>
            </UCard>
          </CommonMainSection>
        </div>
      </Layout>
    </ZySuperResponsive>
  </div>
</template>

<script setup lang="ts">
  import { cardTransitionEnd as ArticleCardTransitionEnd } from "~/components/layout/ArticleCard/transition";
  import { cardTransitionEnd as ShuoShuoCardTransitionEnd } from "~/components/layout/ShuoShuoCard/transition";
  import { cardTransitionEnd as AlbumCardTransitionEnd } from "~/components/layout/AlbumCard/transition";
  import { cardTransitionEnd as VideoCardTransitionEnd } from "~/components/layout/VideoCard/transition";

  const props = defineProps({
    // 接受错误页面传递的错误信息
    error: {
      type: Object,
      required: true,
    },
  });

  const route = useRoute();
  const isAdminPage = ref(false);
  const isLoginPage = ref(false);
  const isVideoDetailPage = ref(false);
  // 监听路由变化，切换布局
  watch(
    () => props.error,
    (newValue) => {
      const newPath = newValue.url;
      if (newPath) {
        if (newPath.startsWith("/admin")) {
          isAdminPage.value = true;
          isLoginPage.value = false;
        } else if (newPath.startsWith("/login")) {
          isAdminPage.value = false;
          isLoginPage.value = true;
        } else {
          isAdminPage.value = false;
          isLoginPage.value = false;
        }

        if (newPath.includes("/audio/video/")) {
          isVideoDetailPage.value = true;
        } else {
          isVideoDetailPage.value = false;
        }
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    ArticleCardTransitionEnd();
    ShuoShuoCardTransitionEnd();
    AlbumCardTransitionEnd();
    VideoCardTransitionEnd();
    console.log(props.error);
  });
</script>
<style>
  .stack.internal {
    color: var(--text-1);
    display: block;
    white-space: break-spaces;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>

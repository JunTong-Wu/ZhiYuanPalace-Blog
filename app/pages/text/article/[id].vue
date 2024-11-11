<template>
  <div class="overflow-hidden">
    <div class="zy-article-card transition-in">
      <ZyFetchLoading :fetchData="(articleData as any)">
        <template v-slot:loading></template>
        <template v-slot:onload="{ row: item }">
          <div class="zy-article-card-inner">
            <div class="zy-card-image">
              <ZyLazyImage :locked="item.has_password" :src="`${cdnUrl}${item.article_title_image}`" alt="" />
            </div>
          </div>
          <div
            class="zy-article-card-text pt-8 xs:pt-10 sm:pt-12 md:pt-14 lg:pt-16 px-8 xs:px-10 sm:px-12 md:px-14 lg:px-16">
            <h1 v-if="!item.has_password"
              class="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 mt-0">
              {{ item.article_title }}
            </h1>
            <div v-else>
              <ZySkeleton :row="3" />
              <div class="flex justify-center items-center mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16">
                <PassWordModel type="article" :id="item.article_id" @validate-success="getArticleWithPassword">
                  <ZyButton>输入密码</ZyButton>
                </PassWordModel>
              </div>
            </div>
            <v-md-preview v-if="!item.has_password" class="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-xl pb-40"
              ref="preview" :text="item.article_text"></v-md-preview>
            <div v-else class="pb-40"></div>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
    <Toolbar />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "文章详情",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-article-details",
  },
});
definePageMeta({
  pageTransition: {
    name: "third-layer",
    mode: "out-in",
  },
  middleware: "transition",
});

const route = useRoute();
const id = route.params.id as string;

// 获取文章内容
const articleData = shallowRef();
articleData.value = await ApiArticle.getSingleArticle(id, null);
const getArticleWithPassword = async (params: { password: string }) => {
  articleData.value = await ApiArticle.getSingleArticle(id, {
    password: params.password,
  });
};
const cdnUrl = import.meta.env.VITE_APP_CDN_BASE;
</script>
<style>
@import url("~/components/layout/ArticleCard/ArticleCard.scss");

@keyframes an-article-card-text {
  0% {
    transform: translateY(10rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0rem);
    opacity: 1;
  }
}

.zy-article-card-text {
  animation: an-article-card-text 400ms 200ms;
}
</style>

<template>
  <div class="overflow-hidden">
    <Toolbar class="absolute top-0 z-40 right-0 h-full w-toolbar pt-main" />
    <div class="zy-article-card transition-in">
      <ZyFetchLoading :fetchData="(articleData as any)">
        <template v-slot:loading></template>
        <template v-slot:onload="{ row: item }">
          <div class="zy-article-card-inner">
            <div class="zy-card-image">
              <img
                :src="`https://pan.yiru.love${item.article_title_image}`"
                alt=""
              />
            </div>
          </div>
          <div
            class="zy-article-card-text pt-8 xs:pt-10 sm:pt-12 md:pt-14 lg:pt-16 px-8 xs:px-10 sm:px-12 md:px-14 lg:px-16"
          >
            <h1
              class="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 mt-0"
            >
              {{ item.article_title }}
            </h1>
            <v-md-preview
              class="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-xl pb-40"
              ref="preview"
              :text="item.article_text"
            ></v-md-preview>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
  </div>
</template>
<script setup lang="ts">
import { cardTransitionEnd } from "~/transition/articleCard/articleCard";

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
const articleData = ApiArticle.search_article_by_id(id);

watch(articleData.pending, (newValue: any) => {
  if (!newValue) {
    if (articleData.res.value && (articleData.res.value as any).code == 200) {
      setTimeout(() => {
        cardTransitionEnd();
      }, 200);
    }
  }
});
</script>
<style>
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
  animation: an-article-card-text 400ms;
}
</style>

<template>
  <CommonMainSection>
    <div
      class="grid grid-cols-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8"
    >
      <div class="col-span-12">
        <div
          class="portrait:p-0 landscape:py-4 xs:py-4 sm:py-6 md:py-7 lg:py-8 pl-0 rounded-2xl"
        >
          <h3
            class="col-span-12 m-0 font-normal landscape:font-bold text-base sm:text-xl lg:text-2xl pt-4"
          >
            所有文章
          </h3>
          <ZyFetchLoading
            :fetchData="(articleListData as any)"
            rowClass="grid grid-cols-12 portrait:gap-0 portrait:xs:gap-4 gap-4 xs:gap-4 sm:gap-6 md:gap-7 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8"
            cloClass="
            portrait:col-span-12 landscape:col-span-12
            portrait:xs:col-span-12 landscape:xs:col-span-12
            portrait:sm:col-span-6 landscape:sm:col-span-6
            portrait:md:col-span-6 landscape:md:col-span-6
            portrait:lg:col-span-6 landscape:lg:col-span-6
            portrait:xl:col-span-6 landscape:xl:col-span-4
            "
            :minLoadingNumber="12"
          >
            <template v-slot:loading>
              <ArticleCard skeleton class="rounded-2xl">
                <template #image>
                  <ZySkeleton type="image" />
                </template>
                <template #title>
                  <ZySkeleton :row="3" />
                </template>
              </ArticleCard>
            </template>
            <template v-slot:onload="{ row: item }">
              <ArticleCard
                :href="`/text/article/${item.article_id}`"
                class="sm:rounded-2xl"
              >
                <template #image>
                  <ZyLazyImage
                    :src="`https://pan.yiru.love${item.article_title_image}`"
                    alt=""
                  />
                </template>
                <template #title>
                  <div class="h-full flex flex-col justify-center">
                    <h4
                      class="m-0 portrait:text-base landscape:text-xl portrait:font-normal landscape:font-bold line-clamp-1"
                    >
                      {{ item.article_title }}
                    </h4>
                    <p
                      class="m-0 mt-2 portrait:text-sm landscape:text-base portrait:line-clamp-2 landscape:line-clamp-3 text-text-2"
                    >
                      {{ item.article_text.replace(/\r\n/g, "") }}
                    </p>
                  </div>
                </template>
              </ArticleCard>
            </template>
          </ZyFetchLoading>
        </div>
      </div>
    </div>
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
useHead({
  title: "文章",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-article",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});

// 获取文章列表
const articleListData = await ApiArticle.search_articles_all();
</script>
<style>
@import url("~/components/layout/ArticleCard/ArticleCard.scss");
</style>

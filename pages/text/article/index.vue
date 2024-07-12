<template>
  <div class="pr-toolbar pt-main">
    <div class="portrait:p-0 landscape:p-4 xs:p-4 sm:p-6 md:p-7 lg:p-8">
      <div>
        <div
          class="grid grid-cols-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8"
        >
          <div class="col-span-12">
            <div
              class="bg-bg-card portrait:p-0 landscape:p-4 xs:p-4 sm:p-6 md:p-7 lg:p-8 rounded-xl"
            >
              <h3
                class="col-span-12 m-0 font-normal text-base sm:text-xl lg:text-2xl pt-4 pl-4"
              >
                所有文章
              </h3>
              <ZyFetchLoading
                :fetchData="(articleListData as any)"
                rowClass="grid grid-cols-12 portrait:gap-0 landscape:gap-4 xs:gap-4 sm:gap-6 md:gap-7 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8"
                cloClass="portrait:col-span-12 landscape:col-span-4 portrait:xs:col-span-6 landscape:xs:col-span-4 portrait:sm:col-span-6 landscape:sm:col-span-4 portrait:md:col-span-4 landscape:md:col-span-4 portrait:lg:col-span-4 landscape:lg:col-span-3 portrait:xl:col-span-3 landscape:xl:col-span-2"
                :minLoadingNumber="12"
              >
                <template v-slot:loading>
                  <articleCard skeleton class="rounded-xl">
                    <template #image>
                      <ZySkeleton type="image" />
                    </template>
                    <template #title>
                      <ZySkeleton :row="3" />
                    </template>
                  </articleCard>
                </template>
                <template v-slot:onload="{ row: item }">
                  <articleCard
                    :href="`/text/article/${item.article_id}`"
                    class="sm:rounded-xl"
                  >
                    <template #image>
                      <img
                        :src="`https://pan.yiru.love${item.article_title_image}`"
                        alt=""
                      />
                    </template>
                    <template #title>
                      <h4 class="m-0 text-base font-normal line-clamp-1">
                        {{ item.article_title }}
                      </h4>
                      <p class="m-0 mt-2 text-sm line-clamp-2 color-text-2">
                        {{ item.article_text.replace(/\r\n/g, "") }}
                      </p>
                    </template>
                  </articleCard>
                </template>
              </ZyFetchLoading>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toolbar class="absolute top-0 bottom-0 right-0 w-toolbar pt-main" />
  </div>
</template>
<script setup lang="ts">
import articleCard from "@/transition/articleCard/articleCard.vue";
import { ApiArticle } from "~/utils/api/article";

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
let articleListData = ApiArticle.search_articles_all();
</script>

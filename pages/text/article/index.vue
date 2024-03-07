<template>
  <div pr-toolbar pt-header-music>
    <div p="0 sm:6 md:7 lg:8">
      <div>
        <div grid grid-cols-12 gap="4 xs:5 sm:6 md:7 lg:8" mb="4 xs:5 sm:6 md:7 lg:8">
          <div col-span-12>
            <div bg="bg-card" p="0 sm:6 md:7 lg:8" sm:rounded-xl>
              <h3 col-span-12 m-0 font-normal text-base sm:text-xl lg:text-2xl pt-4 pl-4>
                所有文章
              </h3>
              <ZyFetchLoading :fetchData="(articleListData as any)"
                rowClass="grid grid-cols-12 gap-0 xs:gap-0 sm:gap-6 md:gap-7 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8"
                cloClass="col-span-12 xs:col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3"
                :minLoadingNumber="12">
                <template v-slot:loading>
                  <articleCard skeleton bg="bg-card" sm:rounded-xl>
                    <template #image>
                      <ZySkeleton type="image" />
                    </template>
                    <template #title>
                      <ZySkeleton :row="3" />
                    </template>
                  </articleCard>
                </template>
                <template v-slot:onload="{ row: item }">
                  <articleCard :href="`/text/article/${item.article_id}`" bg="bg-card" sm:rounded-xl>
                    <template #image>
                      <img :src="`https://pan.yiru.love${item.article_title_image}`" alt="" />
                    </template>
                    <template #title>
                      <h4 m-0 text-base font-normal line-clamp-1>
                        {{ item.article_title }}
                      </h4>
                      <p m-0 mt-2 text-sm line-clamp-2 color="text-2">
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
    <Toolbar absolute top-0 bottom-0 right-0 w-toolbar pt-header-music />
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

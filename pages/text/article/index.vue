<template>
  <div pr-toolbar pt-header>
    <div p="0 xs:0 sm:6 md:7 lg:8">
      <div>
        <div
          grid
          grid-cols-12
          gap="4 xs:5 sm:6 md:7 lg:8"
          mb="4 xs:5 sm:6 md:7 lg:8"
        >
          <div col-span-12>
            <div bg="bg-card" p="4 xs:5 sm:6 md:7 lg:8" sm:rounded-3xl>
              <h3 col-span-12 m-0 font-normal text-base sm:text-xl>所有文章</h3>
              <zy-fetch-loading
                :fetchData="articleListData"
                rowClass="grid grid-cols-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8"
                cloClass="col-span-12 xs:col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3"
                :minLoadingNumber="3"
              >
                <template v-slot:loading> loading... </template>
                <template v-slot:onload="{ row: item }">
                  <articleCard
                    :href="`/text/article/${item.article_id}`"
                    rounded-2xl
                    bg="bg-card md:bg-card"
                  >
                    <template #image>
                      <img
                        :src="`https://pan.yiru.love/${item.article_title_image}`"
                        alt=""
                      />
                    </template>
                    <template #title>
                      <h4 text-base sm:text-xl font-normal>{{ item.article_title }}</h4>
                      <p text-sm sm:text-base pt-1 color="text-2">
                        {{ item.article_text.replace(/\r\n/g, "") }}
                      </p>
                    </template>
                  </articleCard>
                </template>
              </zy-fetch-loading>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toolbar absolute top-0 bottom-0 right-0 w-toolbar pt-header />
  </div>
</template>
<script setup lang="ts">
import articleCard from "@/transition/articleCard/articleCard.vue";
// 按需导入接口方法
import { search_articles_all } from "@/apis/articles/GET";

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
let articleListData = search_articles_all();
</script>

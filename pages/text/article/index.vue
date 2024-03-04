<template>
  <div pr-toolbar pt-header>
    <div p="4 xs:5 sm:6 md:7 lg:8">
      <div>
        <div
          grid
          grid-cols-12
          gap="4 xs:5 sm:6 md:7 lg:8"
          mb="4 xs:5 sm:6 md:7 lg:8"
        >
          <div col-span-12>
            <div
              grid
              grid-cols-12
              gap="4 xs:5 sm:6 md:7 lg:8"
              bg="bg-card"
              p="4 xs:5 sm:6 md:7 lg:8"
              rounded-3xl
            >
              <h3 col-span-12 m-0 font-normal text-base>所有文章</h3>
              <articleCard
                :href="`/text/article/${n}`"
                v-for="n in 12"
                rounded-lg
                bg="bg-card"
              >
                <template #image>
                  <img
                    :src="`https://pan.yiru.love/uploads/article/${n}.jpg`"
                    alt=""
                  />
                </template>
                <template #title>
                  <p text-sm>GO {{ n }}</p>
                  <p text-xs pt-1 color="text-2">
                    text text text text text text text text text text text text
                    text text text text text text text text text text text text
                    text text text text text text text text text text text text
                  </p>
                </template>
              </articleCard>
            </div>
          </div>
        </div>
        <div col-span-12>
          <div flex gap-4>
            <div
              bg="bg-card"
              h-10
              w-10
              rounded-lg
              flex
              items-center
              justify-center
              v-for="n in 3"
            >
              {{ n }}
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
</script>

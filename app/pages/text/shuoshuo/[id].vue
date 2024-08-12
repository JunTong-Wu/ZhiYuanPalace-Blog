<template>
  <div class="overflow-hidden">
    <div class="zy-shuoshuo-card transition-in">
      <ZyFetchLoading :fetchData="(shuoshuoData as any)">
        <template v-slot:loading></template>
        <template v-slot:onload="{ row: item }">
          <div class="zy-shuoshuo-card-inner">
            <div class="zy-card-title">
              <p>
                {{ item.shuoshuo_text.replace(/\r\n/g, "") }}
              </p>
            </div>
            <div class="zy-card-image">
              <div v-for="n in item.shuoshuo_images">
                <ZyLazyImage
                  className="aspect-square"
                  :src="`https://pan.yiru.love${n}`"
                  alt=""
                />
              </div>
            </div>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
    <Toolbar />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "说说详情",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-shuoshuo-details",
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
const shuoshuoData = ApiShuoShuo.search_shuoshuo_by_id(id);
</script>
<style>
@import url("~/components/layout/ShuoShuoCard/ShuoShuoCard.scss");
</style>

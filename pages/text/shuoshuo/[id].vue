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
                <img
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
import shuoshuoCard from "@/transition/shuoshuoCard/shuoshuoCard.vue";
import { cardTransitionEnd } from "~/transition/shuoshuoCard/shuoshuoCard";

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

watch(shuoshuoData.pending, (newValue: any) => {
  if (!newValue) {
    if (shuoshuoData.res.value && (shuoshuoData.res.value as any).code === 0) {
      setTimeout(() => {
        cardTransitionEnd();
      }, 200);
    }
  }
});
</script>
<style>
@keyframes an-shuoshuo-card-text {
  0% {
    transform: translateY(10rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0rem);
    opacity: 1;
  }
}

.zy-shuoshuo-card-text {
  animation: an-shuoshuo-card-text 400ms;
}
</style>

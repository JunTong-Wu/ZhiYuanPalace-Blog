<template>
  <div class="overflow-hidden">
    <div class="zy-shuoshuo-card transition-in">
      <ZyFetchLoading :fetchData="shuoshuoDataLazyFetch" @fetchOnload="showShuoshuo">
        <template #loading></template>
        <template #onload>
          <div class="zy-shuoshuo-card-inner">
            <div class="zy-card-title">
              <p>
                {{ shuoshuoData.shuoshuo_text.replace(/\r\n/g, "") }}
              </p>
            </div>
            <div class="zy-card-image">
              <div v-for="n in shuoshuoData.shuoshuo_images">
                <ZyLazyImage className="aspect-square" :src="`${cdnUrl}${n}`" alt="" />
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

const { setPostInfo } = toRefs(
  store.usePostInfo()
);
const setHeaderTitle = (id: number, title: string) => {
  setPostInfo.value(id, "shuoshuo", title)
}

const route = useRoute();
const id = route.params.id as string;

// 获取文章内容
const shuoshuoDataLazyFetch = await ApiShuoShuo.showShuoshuo({ shuoshuo_id: id });
const shuoshuoData = ref<ShuoshuoModelType>(new ShuoshuoModel());
const showShuoshuo = (result: ResOptionsModelType<ShuoshuoModelType>) => {
  shuoshuoData.value = result.data;
  setHeaderTitle(shuoshuoData.value.shuoshuo_id, shuoshuoData.value.shuoshuo_text.substring(0, 30) + "...");
};
const config = useRuntimeConfig();
const cdnUrl = config.public.CDN_URL;
</script>
<style lang="scss">
@import url("@/components/layout/ShuoShuoCard/ShuoShuoCard.scss");
</style>
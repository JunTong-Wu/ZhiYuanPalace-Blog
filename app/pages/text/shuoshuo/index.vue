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
            所有说说
          </h3>
        </div>
        <ZyFetchLoading
          class="pt-8"
          :fetchData="(shuoshuoListData as any)"
          rowClass="grid grid-cols-12 gap-0 landscape:xs:gap-4 portrait:sm:gap-6 landscape:sm:gap-6 portrait:md:col-span-7 landscape:md:gap-7 portrait:lg:gap-8 landscape:lg:gap-8"
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
            <ShuoShuoCard skeleton>
              <template #image>
                <div v-for="n in 3">
                  <ZySkeleton type="image" />
                </div>
              </template>
              <template #title>
                <ZySkeleton :row="3" />
              </template>
            </ShuoShuoCard>
          </template>
          <template v-slot:onload="{ row: item }">
            <ShuoShuoCard :href="`/text/shuoshuo/${item.shuoshuo_id}`">
              <template #image>
                <div v-for="n in item.shuoshuo_images">
                  <ZyLazyImage
                    className="aspect-square"
                    :src="`https://pan.yiru.love${n}`"
                    alt=""
                  />
                </div>
              </template>
              <template #title>
                <p>
                  {{ item.shuoshuo_text.replace(/\r\n/g, "") }}
                </p>
              </template>
            </ShuoShuoCard>
          </template>
        </ZyFetchLoading>
      </div>
    </div>
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
useHead({
  title: "说说",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-shuoshuo",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});

// 获取说说列表
const shuoshuoListData = ApiShuoShuo.search_shuoshuo_all();
</script>
<style>
@import url("~/components/layout/ShuoShuoCard/ShuoShuoCard.scss");
</style>

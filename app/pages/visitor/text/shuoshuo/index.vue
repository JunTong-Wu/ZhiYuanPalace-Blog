<template>
  <CommonMainSection>
    <ZyFetchLoading class="pt-8" :fetchData="shuoshuoListDataLazyFetch" @fetchOnload="showShuoshuoList">
      <template #loading>
        <ul class="row-shuoshuo">
          <li class="clo-shuoshuo-card" v-for="n in 12">
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
          </li>
        </ul>

      </template>
      <template #onload>
        <ul class="row-shuoshuo">
          <li class="clo-shuoshuo-card" v-for="item in shuoshuoListData">
            <ShuoShuoCard :href="`/text/shuoshuo/${item.shuoshuo_id}`">
              <template #image>
                <div v-for="n in item.shuoshuo_images">
                  <ZyLazyImage className="aspect-square" :src="`${cdnUrl}${n}`" alt="" />
                </div>
              </template>
              <template #title>
                <p>
                  {{ item.shuoshuo_text.replace(/\r\n/g, "") }}
                </p>
              </template>
            </ShuoShuoCard>
          </li>
        </ul>
      </template>
    </ZyFetchLoading>
    <Toolbar>789789</Toolbar>
  </CommonMainSection>
</template>
<script setup lang="ts">
// 获取说说列表
const shuoshuoListDataLazyFetch = await ApiShuoShuo.getShuoshuoList(null);
const shuoshuoListData = ref<ShuoshuoListItem[]>();
const showShuoshuoList = (result: ResOptions<ShuoshuoList>) => {
  shuoshuoListData.value = result.data.list;
};
const config = useRuntimeConfig();
const cdnUrl = config.public.CDN_URL;
</script>

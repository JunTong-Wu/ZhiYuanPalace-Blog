<template>
  <div>
    <div grid grid-cols-12 gap-4 mb-4>
      <div
        col-span-12
        xs:col-span-12
        sm:col-span-4
        md:col-span-6
        lg:col-span-6
        bg="bg-2"
        p-4
        rounded-3xl
      >
        <h3 col-span-12 m-0 font-normal text-base>最新</h3>
      </div>
      <div
        col-span-12
        xs:col-span-6
        sm:col-span-4
        md:col-span-3
        lg:col-span-3
        bg="bg-2"
        p-4
        rounded-3xl
      >
        <h3 col-span-12 m-0 font-normal text-base>分类</h3>
      </div>
      <div
        col-span-12
        xs:col-span-6
        sm:col-span-4
        md:col-span-3
        lg:col-span-3
        bg="bg-2"
        p-4
        rounded-3xl
      >
        <h3 col-span-12 m-0 font-normal text-base>标签</h3>
      </div>
    </div>

    <div grid grid-cols-12 gap-4 bg="bg-2" p-4 rounded-3xl mb-4>
      <h3 col-span-12 m-0 font-normal text-base>所有文章</h3>
      <zy-store-style-card :href="`/article/${n}`" v-for="n in 3" rounded-lg>
        <template #image>
          <img :src="`https://pan.yiru.love/uploads/article/${n}.jpg`" alt="" />
        </template>
        <template #title> GO {{ n }} </template>
      </zy-store-style-card>
    </div>

    <div bg="bg-2" p-4 rounded-3xl mb-4 flex gap-4>
      <div bg="bg-3" h-10 w-10 rounded-lg flex items-center justify-center v-for="n in 3">{{ n }}</div>
    </div>
  </div>
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
  middleware: "transition",
});
</script>

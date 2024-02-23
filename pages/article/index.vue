<template>
  <div>
    <div
      grid
      grid-cols-12
      gap="4 xs:5 sm:6 md:7 lg:8"
      mb="4 xs:5 sm:6 md:7 lg:8"
    >
      <div
        col-span-12
        xs:col-span-12
        sm:col-span-4
        md:col-span-6
        lg:col-span-6
        bg="bg-4"
        p-4
        rounded-2xl
      >
        <h3 col-span-12 m-0 font-normal text-sm>最新</h3>
      </div>
      <div
        col-span-12
        xs:col-span-6
        sm:col-span-4
        md:col-span-3
        lg:col-span-3
        bg="bg-4"
        p-4
        rounded-2xl
      >
        <h3 col-span-12 m-0 font-normal text-sm>分类</h3>
      </div>
      <div
        col-span-12
        xs:col-span-6
        sm:col-span-4
        md:col-span-3
        lg:col-span-3
        bg="bg-4"
        p-4
        rounded-2xl
      >
        <h3 col-span-12 m-0 font-normal text-sm>标签</h3>
      </div>
      <div col-span-12>
        <div grid grid-cols-12 gap-4 bg="bg-4" p-4 rounded-2xl>
          <h3 col-span-12 m-0 font-normal text-sm>所有文章</h3>
          <zy-store-style-card
            bg="bg-5"
            :href="`/article/${n}`"
            v-for="n in 3"
            rounded-lg
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
                text text text text text text text text text text text text text
                text text text text text text text text text text text text text
                text text text text text text text text text text
              </p>
            </template>
          </zy-store-style-card>
        </div>
      </div>
    </div>
    <div col-span-12>
      <div flex gap-4>
        <div
          bg="bg-4"
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
  pageTransition: {
    name: "first-layer",
    mode: "out-in",
  },
  middleware: "transition",
});
</script>

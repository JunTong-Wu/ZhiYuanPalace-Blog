<template>
  <div>
    <div
      v-if="
        route.fullPath == '/text' ||
        route.fullPath == '/text/article' ||
        route.fullPath == '/text/shuoshuo'
      "
      pt-header
    >
      <ul>
        <li>
          <zy-link to="/text/article">文章</zy-link>
        </li>
        <li>
          <zy-link to="/text/shuoshuo">说说</zy-link>
        </li>
      </ul>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "文字类",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-text",
  },
});
definePageMeta({
  pageTransition: {
    name: "first-layer",
    mode: "out-in",
  },
  middleware: "transition",
});
const route = useRoute();
const router = useRouter();
onMounted(()=>{
  if(route.fullPath == '/text'){
    router.replace('/text/article')
  }
})
</script>

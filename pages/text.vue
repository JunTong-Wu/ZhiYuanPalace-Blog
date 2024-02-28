<template>
  <div>
    <div
      v-if="
        route.fullPath == '/text' ||
        route.fullPath == '/text/article' ||
        route.fullPath == '/text/shuoshuo'
      "
      pt-header
      pr-toolbar
    >
      <ul flex h-tabs gap-4 p="4 xs:5 sm:6 md:7 lg:8 b-0!">
        <li h-full>
          <zy-link
            to="/text/article"
            w-20
            h-full
            flex
            justify-center
            items-center
            bg="bg-card!"
            rounded-2xl
            >文章</zy-link
          >
        </li>
        <li h-full>
          <zy-link
            to="/text/shuoshuo"
            w-20
            h-full
            flex
            justify-center
            items-center
            bg="bg-card!"
            rounded-2xl
            >说说</zy-link
          >
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
onBeforeMount(() => {
  if (route.fullPath == "/text") {
    router.replace("/text/article");
  }
});
</script>

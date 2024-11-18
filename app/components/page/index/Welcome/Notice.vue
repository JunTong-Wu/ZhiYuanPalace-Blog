<template>
  <div class="bg-level-1 rounded relative overflow-hidden w-full h-full">
    <div class="relative z-1 h-full">
      <h4 class="text-base mb-2 bg-[#ffcf60] dark:bg-level-5 p-4">公告</h4>
      <div class="p-8 pt-4">
        <span class="text-sm">项目使用 NUXT3
          框架，正在持续开发中，随时可能无法访问，给您带来不便请谅解。</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { locale } = useI18n();
const cnClass = computed(() => {
  return locale.value.includes("zh-CN");
});
</script>
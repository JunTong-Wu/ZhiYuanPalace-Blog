<template>
  <div class="bg-level-1 rounded relative overflow-hidden w-full h-full">
    <div class="relative z-1 h-full">
      <h4 class="text-xl mb-2 bg-[#ffcf60] dark:bg-level-5 p-4">公告</h4>
      <ul class="p-8 pt-4">
        <li class="mb-2">
          本网站项目使用 NUXT3
          全栈开发，正在持续开发中，随时可能无法访问，给您带来不便请谅解。
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const { locale } = useI18n();
  const cnClass = computed(() => {
    return locale.value.includes("zh");
  });
</script>

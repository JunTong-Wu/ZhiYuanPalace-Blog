<template>
  <ZyButton type="transparent" @click="backToTop" class="h-header flex justify-center items-center" :class="{
    '!p-0 !ml-0 opacity-0 !min-w-0 pointer-events-none': progress < 1,
    'opacity-100 max-w-32': progress >= 1,
  }">
    <div
      class="relative flex justify-center items-center bg-text-1 text-background rounded-full transition-all duration-300 pointer-events-none"
      :class="{
        'w-0 h-0 scale-0': progress < 1,
        'w-8 h-8': progress >= 1 && progress < 90,
        'w-24 h-8 is-text-mode': progress >= 90,
      }">
      <span class="progress absolute w-full h-full text-xs flex justify-center items-center transition-all duration-300"
        :class="{
          'opacity-100': progress < 90,
          'opacity-0': progress >= 90,
        }">
        {{ progress }}
      </span>
      <span class="text text-xs transition-all duration-300 line-clamp-1" :class="{
        'opacity-0': progress < 90,
        'opacity-100': progress >= 90,
      }">
        返回顶部</span>
      <span
        class="ui-arrow-up absolute w-full h-full flex justify-center items-center opacity-0 transition-all duration-300">
        <UIcon name="i-fluent-arrow-up-12-filled" class="w-4 h-4" />
      </span>
    </div>
  </ZyButton>
</template>
<script setup lang="ts">
const progress = ref(0)
const calculateProgress = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const scrollPercent = scrollTop / (scrollHeight - clientHeight);
  progress.value = Math.round(scrollPercent * 100);
}
const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
onMounted(() => {
  window.addEventListener('scroll', calculateProgress);
})
</script>
<style lang="scss" scoped>
@media (orientation: landscape) {
  button {
    &:hover {
      div {
        background-color: var(--theme-color-500);
        scale: 1.25;

        .progress,
        .text {
          opacity: 0;
        }

        .ui-arrow-up {
          opacity: 1;
        }

        &.is-text-mode {
          scale: 1;
        }
      }
    }
  }
}
</style>
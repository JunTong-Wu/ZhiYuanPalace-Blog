<template>
  <div
    class="transition-all duration-300"
    :class="{
      'w-0 h-0 scale-0 p-0 ml-0': progress < 1,
      'h-14 w-14 p-2 -ml-2': progress >= 1 && progress < 90,
      'h-14 w-14 landscape:w-32 p-2 -ml-2 is-text-mode': progress >= 90,
    }"
  >
    <ZyButton
      type="icon"
      @click="backToTop"
      class="flex justify-center items-center w-full h-full"
    >
      <div
        class="relative flex justify-center items-center rounded-full pointer-events-none border-2 border-text-3"
        :class="{
          'w-0 h-0 scale-0': progress < 1,
          'w-7 h-7': progress >= 1 && progress < 90,
          'w-7 landscape:w-24 h-7 is-text-mode': progress >= 90,
        }"
      >
        <span
          class="progress absolute w-full h-full text-xs flex justify-center items-center duration-300"
          :class="{
            'opacity-100': progress < 90,
            'opacity-0': progress < 1 || progress >= 90,
          }"
        >
          {{ progress }}
        </span>
        <span
          class="text text-xs flex justify-center items-center"
          :class="{
            'opacity-0': progress < 90,
            'opacity-100': progress >= 90,
          }"
        >
          <i class="not-italic portrait:hidden line-clamp-1">返回顶部</i>
          <UIcon
            name="i-solar-map-arrow-up-bold"
            class="landscape:hidden w-3 h-3"
          />
        </span>
        <span
          class="ui-arrow-up absolute w-full h-full flex justify-center items-center opacity-0"
        >
          <UIcon
            name="i-solar-map-arrow-up-bold"
            class="w-4 h-4"
          />
        </span>
      </div>
    </ZyButton>
  </div>
</template>
<script setup lang="ts">
  const progress = ref(0);
  const calculateProgress = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    const scrollPercent = scrollTop / (scrollHeight - clientHeight);
    progress.value = Math.round(scrollPercent * 100) || 0;
  };
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", calculateProgress);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", calculateProgress);
  });
</script>
<style lang="scss" scoped>
  button {
    div {
      transition:
        width 0.3s ease-in-out,
        height 0.3s ease-in-out,
        transform 0.3s ease-in-out;
    }
  }

  @media (orientation: landscape) {
    button {
      &:hover {
        div {
          border-color: transparent;

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

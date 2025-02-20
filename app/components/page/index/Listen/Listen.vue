<template>
  <div class="relative bg-level-1">
    <div class="container flex portrait:flex-col relative py-12 portrait:pt-0">
      <div
        class="w-1/2 relative flex justify-center items-center landscape:scale-75 landscape:sm:scale-100 portrait:w-full portrait:scale-75"
      >
        <div class="home-section4-image relative h-[24rem] w-[24rem]">
          <img
            class="h-full w-full object-cover rounded-full"
            src="@/assets/image/record.png"
            alt=""
          />
        </div>
        <div class="absolute h-[22rem] w-[22rem] z-10 blur-xl opacity-50">
          <ClientOnly>
            <img
              class="h-full w-full object-cover rounded-full"
              :src="`${cdnUrl}${musicNowCover}`"
              alt=""
            />
          </ClientOnly>
        </div>
        <div class="absolute h-[14rem] w-[14rem] z-10">
          <ClientOnly>
            <img
              class="h-full w-full object-cover rounded-full"
              :src="`${cdnUrl}${musicNowCover}`"
              alt=""
            />
          </ClientOnly>
        </div>
        <div
          class="absolute h-[24rem] top-0 z-10 landscape:-right-16 landscape:sm:right-10 portrait:-right-8"
        >
          <img
            class="h-full object-cover"
            src="@/assets/image/stylus.png"
            alt=""
          />
        </div>
      </div>
      <div
        class="w-1/2 px-16 landscape:py-12 landscape:sm:py-24 portrait:px-8 portrait:py-0 flex flex-col justify-center portrait:w-full"
      >
        <span
          class="text-theme-500 landscape:sm:text-2xl font-bold mb-2 landscape:sm:mb-4"
          >音乐</span
        >
        <h2 class="text-3xl landscape:sm:text-5xl font-bold">播放一首音乐</h2>
        <div class="h-1 w-16 bg-theme-500 my-4 landscape:sm:my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          『知鸢宫』包含了优雅的音乐播放器，欢迎听听我的歌单，通过旋律和声音了解我。
          点击页面上方的『播放器』，可以进入全屏歌词页面。
        </p>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          现在『知鸢宫』的全局主题颜色，由音乐封面吸取。
        </p>
        <div
          class="flex w-full landscape:gap-12 landscape:sm:mt-12 landscape:sm:gap-24 portrait:gap-12 portrait:justify-center"
        >
          <div class="flex">
            <ZyButton
              class="aspect-square"
              title="上一曲"
              type="transparent"
              @click="musicPrev"
            >
              <UIcon
                name="i-solar-skip-previous-bold"
                class="w-12 h-12 portrait:w-8 portrait:h-8"
              />
            </ZyButton>
          </div>
          <div class="flex">
            <ZyButton
              class="aspect-square text-theme-500"
              title="播放"
              type="transparent"
              @click="togglePlay"
            >
              <template v-if="musicPlayState">
                <UIcon
                  name="i-solar-pause-circle-bold"
                  class="w-24 h-24 portrait:w-16 portrait:h-16"
                />
              </template>
              <template v-else>
                <UIcon
                  name="i-solar-play-circle-bold"
                  class="w-24 h-24 portrait:w-16 portrait:h-16"
                />
              </template>
            </ZyButton>
          </div>
          <div class="flex">
            <ZyButton
              class="aspect-square"
              title="下一曲"
              type="transparent"
              @click="musicNext"
            >
              <UIcon
                name="i-solar-skip-next-bold"
                class="w-12 h-12 portrait:w-8 portrait:h-8"
              />
            </ZyButton>
          </div>
          <!-- <div>
          <ZyButton class="aspect-square" title="播放列表" type="transparent">
            <ZyIcon class="landscape:hidden" size="1rem" defaultName="music-list" />
            <ZyIcon class="portrait:hidden" size="1rem" defaultName="music-list" />
          </ZyButton>
        </div> -->
        </div>
      </div>
    </div>
    <!-- logo-slider -->
    <!-- <div class="bg-theme-500 opacity-50 w-full h-16 absolute bottom-0 flex items-center text-white text-3xl font-vivo">
      <div v-for="n in 5" class="inline-block mr-12 -translate-x-16">ZHIYUANPALACE</div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
  // Pinia仓库
  const { togglePlay, musicPrev, musicNext, musicNowCover, musicPlayState } =
    toRefs(store.useMusicControl());
</script>
<style lang="scss" scoped>
  .home-section4-image {
    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    img {
      position: relative;
      z-index: 2;
    }
  }
</style>

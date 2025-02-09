<template>
  <aside id="zy-music-bar"
    class="h-music select-none portrait:rounded-2xs text-white landscape:mr-2 landscape:-ml-2 portrait:fixed left-0 top-music w-music landscape:xs:w-72 landscape:md:w-music z-50 portrait:bg-headBar portrait:backdrop-blur-3xl">
    <div
      class="relative z-10 h-full flex items-center landscape:rounded-xs portrait:rounded-2xs overflow-hidden cursor-pointer"
      @click.prevent="openMusicDrawer">
      <div class="absolute top-0 right-0 -z-1 w-full h-full bg-gradient-to-b from-theme-600 to-theme-700 saturate-75">
        <img v-if="!isLoading" class="h-full w-full object-cover" :src="`${cdnUrl}${musicNowCover}`" alt="" srcset="" />
      </div>
      <div
        class="absolute top-0 right-0 -z-1 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(0,0,0,0.6)] backdrop-blur-3xl">
      </div>
      <div class="open:hidden flex flex-none relative h-full aspect-square">
        <img class="h-[80%] absolute bottom-[10%] drop-shadow-md left-6 portrait:drop-shadow-none"
          src="@/assets/image/record-128.png" alt="" srcset="" />
        <img v-if="!isLoading" class="h-full relative left-0 rounded-2xs shadow-md portrait:shadow-none"
          :src="`${cdnUrl}${musicNowCover}`" alt="" srcset="" ref="MusicCoverImageRef" @load="createDecoration()" />
        <div v-else class="h-full w-full relative left-0 rounded-2xs shadow-md bg-theme-500">
        </div>
      </div>

      <div class="ml-8"></div>
      <div
        class="open:hidden flex h-full w-full items-center pr-2 bottom-0 top-0 relative landscape:xs:hidden landscape:md:flex">
        <p class="flex-1 line-clamp-1 text-xs">
          {{ musicNowTitle }} - {{ musicNowSinger }}
        </p>
      </div>

      <div class="open:hidden flex">
        <div class="flex">
          <ZyButton class="h-music aspect-square" title="上一曲" type="transparent" @click.stop="musicPrev">
            <UIcon name="i-solar-skip-previous-bold" class="w-4 h-4" />
          </ZyButton>
        </div>
        <div class="flex">
          <ZyButton class="h-music aspect-square" title="播放" type="transparent" @click.stop="togglePlay">
            <template v-if="musicPlayState">
              <UIcon name="i-solar-pause-circle-bold" class="w-8 h-8" />
            </template>
            <template v-else>
              <UIcon name="i-solar-play-circle-bold" class="w-8 h-8" />
            </template>
          </ZyButton>
        </div>
        <div class="flex">
          <ZyButton class="h-music aspect-square" title="下一曲" type="transparent" @click.stop="musicNext">
            <UIcon name="i-solar-skip-next-bold" class="w-4 h-4" />
          </ZyButton>
        </div>
      </div>
    </div>
    <audio id="bgMusic" type="audio/ogg" v-if="!refreshAudioElement" loop>
      <source :src="`${cdnUrl}${musicNowAudio}`" />
    </audio>
  </aside>
  <ClientOnly>
    <Teleport to="body">
      <ZyTouch id="zy-music-drawer"
        class="hidden cursor-grab will-change-transform fixed landscape:rounded-xs portrait:rounded-2xs overflow-hidden"
        :init="touchInit" @slidingUp="slidingUp" @slideEndUp="slideEndUp" @slideCancelUp="slideCancelUp">
        <div class="absolute top-0 right-0 -z-1 w-full h-full bg-gradient-to-b from-theme-600 to-theme-700 saturate-75">
          <img v-if="!isLoading" class="h-full w-full object-cover" :src="`${cdnUrl}${musicNowCover}`" alt=""
            srcset="" />
        </div>
        <div
          class="absolute top-0 right-0 -z-1 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(0,0,0,0.6)] backdrop-blur-3xl">
        </div>

        <div class="zy-music-drawer-inner absolute top-0 right-0 z-1 w-full h-full text-white flex justify-center">
          <div
            class="landscape:xs:p-12 landscape:sm:p-16 landscape:md:p-20 portrait:pt-16 landscape:md:pb-36 w-full h-full flex justify-center portrait:flex-col-reverse">
            <div class="landscape:w-1/2 portrait:w-full flex flex-col justify-center items-center">
              <div class="portrait:hidden w-1/2 landscape:md:w-2/3 aspect-square inline-block">
                <div class="p-8 md:p-16 pb-8 md:pt-24">
                  <img v-if="!isLoading" class="h-full w-full object-cover rounded-xs overflow-hidden shadow-lg"
                    :src="`${cdnUrl}${musicNowCover}`" alt="" srcset="" />
                </div>
              </div>
              <div
                class="w-3/4 landscape:md:w-2/3 portrait:w-full inline-block md:p-16 portrait:px-12 portrait:py-8 landscape:pt-0 text-start relative">
                <div class="flex w-full justify-between">
                  <div>
                    <p class="flex-1 line-clamp-1 text-2xl">
                      {{ musicNowTitle }}
                    </p>
                    <p class="flex-1 line-clamp-1 text-xl opacity-50">
                      {{ musicNowSinger }}
                    </p>
                  </div>
                  <div class="">
                    <ZyButton type="transparent" class="bg-[rgba(255,255,255,0.2)] p-2 rounded-full" title="歌曲操作">
                      <UIcon name="i-solar-menu-dots-bold" class="w-6 h-6" />
                    </ZyButton>
                  </div>
                </div>


                <div class="py-4 md:py-10">
                  <URange @mousedown.stop @mousemove.stop @mouseup.stop v-model="value" color="theme" size="lg" />
                  <div class="flex justify-between text-xs opacity-50 mt-4">
                    <span>01:00</span>
                    <span>03:00</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <ZyButton class="h-music aspect-square" title="播放顺序" type="transparent">
                      <UIcon name="i-solar-repeat-one-outline" class="w-6 h-6 portrait:w-5 portrait:h-5 opacity-50" />
                    </ZyButton>
                  </div>
                  <div class="flex gap-8 portrait:gap-4">
                    <div class="flex items-center">
                      <ZyButton class="h-music aspect-square" title="上一曲" type="transparent" @click.stop="musicPrev">
                        <UIcon name="i-solar-skip-previous-bold" class="w-8 h-8 portrait:w-6 portrait:h-6" />
                      </ZyButton>
                    </div>
                    <div class="flex items-center">
                      <ZyButton class="!p-4 !rounded-full" title="播放" @click.stop="togglePlay">
                        <template v-if="musicPlayState">
                          <UIcon name="i-solar-pause-bold" class="w-8 h-8 portrait:w-6 portrait:h-6" />
                        </template>
                        <template v-else>
                          <UIcon name="i-solar-play-bold" class="w-8 h-8 portrait:w-6 portrait:h-6" />
                        </template>
                      </ZyButton>
                    </div>
                    <div class="flex items-center">
                      <ZyButton class="h-music aspect-square" title="下一曲" type="transparent" @click.stop="musicNext">
                        <UIcon name="i-solar-skip-next-bold" class="w-8 h-8 portrait:w-6 portrait:h-6" />
                      </ZyButton>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <ZyButton class="h-music aspect-square" title="播放列表" type="transparent">
                      <UIcon name="i-solar-plaaylist-minimalistic-bold"
                        class="w-6 h-6 portrait:w-5 portrait:h-5 opacity-50" />
                    </ZyButton>
                  </div>
                </div>

              </div>
            </div>
            <div
              class="landscape:w-1/2 pt-16 pb-16 portrait:px-12 text-3xl portrait:text-xl  overflow-y-scroll scrollbar-hiden">
              <div class="flex flex-col gap-10 portrait:gap-4 leading-relaxed" @touchstart.stop @touchmove.stop
                @touchend.stop>
                <p>感受不到这份未来</p>
                <p>别让我一直猜</p>
                <p>感觉不到爱的存在</p>
                <p>何必还要依赖</p>
                <p>触碰不到那片纯白</p>
                <p>怎么给自己一个交待</p>
                <p>在下个转弯</p>
                <p>我就会再离开</p>
                <p>感受不到这份未来</p>
                <p>别让我一直猜</p>
                <p>感觉不到爱的存在</p>
                <p>何必还要依赖</p>
                <p>触碰不到那片纯白</p>
                <p>怎么给自己一个交待</p>
                <p>在下个转弯</p>
                <p>我就会再离开</p>
                <p>感受不到这份未来</p>
                <p>别让我一直猜</p>
                <p>感觉不到爱的存在</p>
                <p>何必还要依赖</p>
                <p>触碰不到那片纯白</p>
                <p>怎么给自己一个交待</p>
                <p>在下个转弯</p>
                <p>我就会再离开</p>
              </div>
            </div>
          </div>

        </div>
      </ZyTouch>
    </Teleport>
  </ClientOnly>
</template>
<script setup lang="ts">
  import "./transition.scss"
  import { musicCardTransitionStart, musicCardTransitionSlidingUp, musicCardTransitionSlideEndUp, musicCardTransitionSlideCancelUp } from "./transition";

  const isLoading = ref(true);
  const isOpen = ref(false);
  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
  const touchInit = ref(0);

  const MusicCoverImageRef = ref();

  // 打开音乐卡片
  const openMusicDrawer = () => {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = "hidden";
    }
    const el = document.getElementById("zy-music-bar");
    const drawer = document.getElementById("zy-music-drawer");
    musicCardTransitionStart(el, drawer, () => {
      isOpen.value = true;
      touchInit.value = Date.now();
    });
  };

  // 关闭音乐卡片
  const slidingUp = (val: any) => {
    const el = document.getElementById("zy-music-bar");
    const drawer = document.getElementById("zy-music-drawer");
    const moveDistanceY = val.moveDistanceY;
    musicCardTransitionSlidingUp(el, drawer, moveDistanceY);
  };

  const slideEndUp = (val: any) => {
    const el = document.getElementById("zy-music-bar");
    const drawer = document.getElementById("zy-music-drawer");
    musicCardTransitionSlideEndUp(el, drawer, () => {
      isOpen.value = false;
      const body = document.documentElement;
      if (body) {
        body.style.overflow = "auto";
      }
      touchInit.value = Date.now();
    });
  };

  const slideCancelUp = () => {
    const el = document.getElementById("zy-music-bar");
    const drawer = document.getElementById("zy-music-drawer");
    musicCardTransitionSlideCancelUp(el, drawer);
    touchInit.value = Date.now();
  };

  onMounted(() => {
    isLoading.value = false;
    watch(MusicCoverImageRef, (newValue: any) => {
      if (newValue.width > 0 && newValue.height > 0) {
        createDecoration();
      }
    });
  })

  // 生成tailwind颜色
  const createDecoration = () => {

    const img = MusicCoverImageRef.value;
    if (img) {
      const imageColor = getImageColor(img);
      const rgb = increaseSaturation(
        adjustBrightnessWhilePreservingHue(imageColor, 50, 50),
        3
      );
      const themeColor = `rgb(${rgb})`;
      const themeColorRGB = `${rgb}`;
      const themeColorTailwind = generateTailwindColors(rgb);
      document.body.setAttribute(
        "style",
        `
      --theme-color: ${themeColor};
      --theme-color-rgb: ${themeColorRGB};
      --theme-color-50: ${themeColorTailwind[50]};
      --theme-color-100: ${themeColorTailwind[100]};
      --theme-color-200: ${themeColorTailwind[200]};
      --theme-color-300: ${themeColorTailwind[300]};
      --theme-color-400: ${themeColorTailwind[400]};
      --theme-color-500: ${themeColorTailwind[500]};
      --theme-color-600: ${themeColorTailwind[600]};
      --theme-color-700: ${themeColorTailwind[700]};
      --theme-color-800: ${themeColorTailwind[800]};
      --theme-color-900: ${themeColorTailwind[900]};
      --theme-color-950: ${themeColorTailwind[950]};
      `
      );
    }
  };

  // Pinia仓库
  const { togglePlay, musicPrev, musicNext, musicNowTitle, musicNowSinger, musicNowCover, musicNowAudio, musicPlayState } = toRefs(
    store.useMusicControl()
  );

  const refreshAudioElement = ref(false);

  // 控制audio播放，暂停
  watch(musicPlayState, (newValue) => {
    const audioElement = document.getElementById("bgMusic") as HTMLMediaElement;
    if (newValue) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  });

  // 控制audio切换音乐
  watch(musicNowAudio, async () => {
    refreshAudioElement.value = true;
    setTimeout(() => {
      refreshAudioElement.value = false;
      setTimeout(() => {
        const audioElement = document.getElementById(
          "bgMusic"
        ) as HTMLMediaElement;
        if (musicPlayState.value) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }, 0);
    }, 0);
  });

  // 控制audio进度条
  const value = ref(50)
</script>

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
    <ClientOnly>
      <Teleport to="body">
        <ZyTouch id="zy-music-drawer"
          class="hidden cursor-grab will-change-transform fixed landscape:rounded-xs portrait:rounded-2xs overflow-hidden"
          :init="touchInit" @slidingUp="slidingUp" @slideEndUp="slideEndUp" @slideCancelUp="slideCancelUp">
          <div
            class="absolute top-0 right-0 -z-1 w-full h-full bg-gradient-to-b from-theme-600 to-theme-700 saturate-75">
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
                      <ZyButton type="transparent" class="bg-[rgba(255,255,255,0.1)] p-2 rounded-full" title="歌曲操作">
                        <UIcon name="i-solar-menu-dots-bold" class="w-6 h-6" />
                      </ZyButton>
                    </div>
                  </div>


                  <div class="py-4 md:py-10">
                    <URange @mousedown.stop @mousemove.stop @mouseup.stop @input="progressBarInput"
                      v-model="progressBar" />
                    <div class="flex justify-between text-xs opacity-50 mt-4">
                      <span>{{ currentTime }}</span>
                      <span>{{ duration }}</span>
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
                        <ZyButton class="!p-4 !rounded-full" title="播放" type="transparent" @click.stop="togglePlay">
                          <template v-if="musicPlayState">
                            <UIcon name="i-solar-pause-bold" class="w-9 h-9 portrait:w-6 portrait:h-6" />
                          </template>
                          <template v-else>
                            <UIcon name="i-solar-play-bold" class="w-9 h-9 portrait:w-6 portrait:h-6" />
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
              <div id="zy-music-lyric"
                class="landscape:w-1/2 pt-16 pb-16 portrait:px-12 text-xl portrait:text-lg  overflow-y-scroll scrollbar-hiden">
                <div class="flex flex-col gap-10 portrait:gap-4 leading-relaxed" @touchstart.stop @touchmove.stop
                  @touchend.stop>
                  <p v-for="lyric in lyricsArray" class="transition-all duration-500" :class="[
                    lyric.isPrev ? 'opacity-40' : '',
                    lyric.isActivate ? 'text-3xl portrait:text-2xl' : '',
                    lyric.isNext ? 'opacity-40' : '',
                    !lyric.isActivate && !lyric.isNext && !lyric.isPrev ? 'opacity-20' : '',
                  ]">{{ lyric.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </ZyTouch>
      </Teleport>
    </ClientOnly>
  </aside>
</template>
<script setup lang="ts">
  import "./transition.scss"
  import { musicCardTransitionStart, musicCardTransitionSlidingUp, musicCardTransitionSlideEndUp, musicCardTransitionSlideCancelUp } from "./transition";

  const emit = defineEmits(["refreshLryric"]);

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


  // Pinia仓库
  const { togglePlay, musicPrev, musicNext, musicNowTitle, musicNowSinger, musicNowCover, musicNowAudio, musicNowLyric, musicPlayState } = toRefs(
    store.useMusicControl()
  );
  const { setMusicList } = toRefs(
    store.useMusicList()
  );

  const refreshAudioElement = ref(false);

  const playStatusInit = () => {
    const audioPlayer = document.getElementById("bgMusic") as HTMLMediaElement;
    if (audioPlayer) {
      musicPlayState.value = false;
    }
  }

  // 控制audio进度条
  const progressBar = ref(0)
  const currentTime = ref('00:00');
  const duration = ref('--:--');

  const formatTime = (time: number) => {
    if (Number.isNaN(time)) {
      return '--:--';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const progressInit = () => {
    const audioPlayer = document.getElementById("bgMusic") as HTMLMediaElement;
    if (audioPlayer) {
      audioPlayer.addEventListener("timeupdate", () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentTime.value = formatTime(audioPlayer.currentTime);
        duration.value = formatTime(audioPlayer.duration);
        progressBar.value = progress;
      });
    }

  }

  // 进度条拖动时更新音乐播放位置
  const progressBarInput = () => {
    const audioPlayer = document.getElementById("bgMusic") as HTMLMediaElement;
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
  }

  // 解析LRC歌词
  type LRC = {
    time: number;
    text: string;
    isActivate: boolean;
    isNext: boolean;
    isPrev: boolean;
  };
  const lyricsArray = ref<Array<LRC>>([{ time: 0, text: '暂无歌词，享受好音乐', isActivate: true, isNext: false, isPrev: false }]);

  const fetchLRCFile = async (url: string) => {
    if (musicNowLyric.value !== '') {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch LRC file: ${response.statusText}`);
        }
        const lrcText = await response.text();
        return lrcText;
      } catch (error) {
        console.error("Error fetching LRC file:", error);
        return null;
      }
    } else {
      return null;
    }
  }
  const parseLRC = (lrcText: string) => {
    const lines = lrcText.split("\n");
    const lyrics = <Array<LRC>>[];
    const timeExp = /\[(\d{2}):(\d{2})\.(\d{2})\]/;
    lines.forEach(line => {
      const match = timeExp.exec(line);
      if (match) {
        const minutes = parseInt(match[1] as string, 10);
        const seconds = parseInt(match[2] as string, 10);
        const milliseconds = parseInt(match[3] as string, 10);
        const time = minutes * 60 + seconds + milliseconds / 100; // 转换为秒
        const text = line.replace(timeExp, "").trim();
        lyrics.push({ time, text, isActivate: false, isNext: false, isPrev: false });
      }
    });
    lyrics.forEach(lyric => {
      if (lyric.text === '') {
        lyrics.splice(lyrics.indexOf(lyric), 1);
      }
    });
    return lyrics;
  }

  const findLyricIndex = (lyrics: Array<LRC>, currentTime: number) => {
    let left = 0;
    let right = lyrics.length - 1;
    let offsetTime = 0.5; // 偏移时间为0.5秒
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      //@ts-ignore
      if (lyrics[mid].time <= currentTime + offsetTime && (mid === lyrics.length - 1 || lyrics[mid + 1].time > currentTime + offsetTime)) {
        return mid;
      }
      //@ts-ignore
      else if (lyrics[mid].time < currentTime) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1; // 如果没有找到合适的歌词，返回-1
  }

  const scrollToNowLyric = () => {
    let lineHeight = 40;
    const lyricElement = document.getElementById("zy-music-lyric");
    if (lyricElement) {
      const audioPlayer = document.getElementById("bgMusic") as HTMLMediaElement;
      const currentIndex = findLyricIndex(lyricsArray.value, audioPlayer.currentTime);
      const lyricWrapperDiv = lyricElement.querySelector('div');
      if (lyricWrapperDiv) {
        lineHeight = (lyricWrapperDiv.offsetHeight / lyricsArray.value.length);
      }
      if (currentIndex !== -1) {
        lyricElement.scrollTo({
          top: (currentIndex - 2) * lineHeight,
          behavior: "smooth",
        });
      }
    }
  }

  const displayLyrics = () => {
    const audioPlayer = document.getElementById("bgMusic") as HTMLMediaElement;
    let currentIndex = -1; // 初始化为-1，表示尚未开始播放
    const lyricElement = document.getElementById("zy-music-lyric");

    if (audioPlayer) {
      audioPlayer.addEventListener("timeupdate", () => {
        const currentTime = audioPlayer.currentTime;
        const newIndex = findLyricIndex(lyricsArray.value, currentTime);

        if (newIndex !== currentIndex) { // 如果歌词索引发生变化
          currentIndex = newIndex;
          if (currentIndex !== -1) { // 如果找到对应的歌词
            for (let i = 0; i < lyricsArray.value.length; i++) {
              (lyricsArray.value[i] as any).isPrev = false;
              (lyricsArray.value[i] as any).isActivate = false;
              (lyricsArray.value[i] as any).isNext = false;
            }
            if (currentIndex > 0) {
              (lyricsArray.value[currentIndex - 1] as any).isPrev = true;
            }
            (lyricsArray.value[currentIndex] as any).isActivate = true;
            if (currentIndex < lyricsArray.value.length - 1) {
              (lyricsArray.value[currentIndex + 1] as any).isNext = true;
            }
            // 滚动到当前歌词
            scrollToNowLyric();
            // 刷新桌面歌词
            emit("refreshLryric", {
              lyric: (lyricsArray.value[currentIndex] as any).text,
            });
          } else {
            // 如果没有找到对应的歌词，将所有歌词的isActivate属性设置为false
            for (let i = 0; i < lyricsArray.value.length; i++) {
              (lyricsArray.value[i] as any).isPrev = false;
              (lyricsArray.value[i] as any).isActivate = false;
              (lyricsArray.value[i] as any).isNext = false;
            }
          }
        }
      })
    }
  }


  watch(isOpen, () => {
    if (isOpen.value) {
      scrollToNowLyric();
    }
  });

  const lyricInit = async () => {
    const getUrl = `${cdnUrl}${musicNowLyric.value}`;
    const lrcText = await fetchLRCFile(getUrl);
    if (lrcText) {
      const lrc = parseLRC(lrcText);
      lyricsArray.value = lrc;
    } else {
      lyricsArray.value = [{ time: 0, text: '暂无歌词，享受好音乐', isActivate: true, isNext: false, isPrev: false }];
    }
    const lyricElement = document.getElementById("zy-music-lyric");
    if (lyricElement) {
      lyricElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    emit("refreshLryric", {
      lyric: (lyricsArray.value[0] as any).text,
    });
    displayLyrics();
  }

  watch(musicNowLyric, async () => {
    lyricInit();
  });

  // 控制audio播放，暂停
  watch(musicPlayState, (newValue) => {
    const audioElement = document.getElementById("bgMusic") as HTMLMediaElement;
    progressInit();
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
        progressInit();
        if (musicPlayState.value) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }, 0);
    }, 0);
  });

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

  // 获取音乐列表
  const getData = async () => {
    const musicListDataLazyFetch = await ApiMusic.getMusicList(null);
    if (musicListDataLazyFetch.data.value) {
      const musicList = musicListDataLazyFetch.data.value?.data
      setMusicList.value(musicList);
    }
  }
  getData();

  onMounted(() => {
    getData();
    isLoading.value = false;
    playStatusInit();
    lyricInit();
    progressInit();
    watch(MusicCoverImageRef, (newValue: any) => {
      if (newValue.width > 0 && newValue.height > 0) {
        createDecoration();
      }
    });
  })

</script>

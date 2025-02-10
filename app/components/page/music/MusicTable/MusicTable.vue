<template>
  <ZyFetchLoading :fetchData="musicListDataLazyFetch" @fetchOnload="showMusicList">
    <template #loading>

    </template>
    <template #onload>
      <UTable :columns="columns" :rows="musicTableDispiay">
        <template #cover-data="{ row }">
          <img class="h-16 w-16 object-cover rounded-xs" :src="`${cdnUrl}${row.cover}`" alt="" srcset="" />
        </template>
        <template #name-data="{ row }">
          <div class="flex items-center space-x-2">
            <div class="flex-1">
              <div class="text-text-1">{{ row.name }}</div>
              <div class="text-text-2 landscape:hidden">{{ row.singer }}</div>
            </div>
          </div>
        </template>
        <template #actions-data="{ row }">
          <div class="flex items-center space-x-4">
            <ZyButton
              class="!p-2 !rounded-full portrait:!bg-transparent portrait:!text-text-1 portrait:!border-none portrait:!shadow-none"
              @click="playThisMusic(row)">
              <UIcon v-if="playingId == row.id && musicPlayState" name="i-solar-pause-bold" class="w-4 h-4" />
              <UIcon v-else name="i-solar-play-bold" class="w-4 h-4" />
            </ZyButton>
          </div>
        </template>
      </UTable>
    </template>
  </ZyFetchLoading>

</template>

<script setup lang="ts">
  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
  const playingId = ref<number>(0);

  const columns = [
    {
      key: 'index',
      label: '#',
      class: 'portrait:hidden',
      rowClass: 'portrait:hidden',
    },
    {
      key: 'cover',
      label: '封面',
      rowClass: 'portrait:w-24',
    }, {
      key: 'name',
      label: '歌曲',
    }, {
      key: 'singer',
      label: '歌手',
      class: 'portrait:hidden',
      rowClass: 'portrait:hidden',
    }, {
      key: 'actions',
      rowClass: 'portrait:w-12',
    }]
  // 获取音乐列表
  const musicTableDispiay = ref<Array<any>>([]);
  const musicListDataLazyFetch = await ApiMusic.getMusicList(null);
  const musicListData = ref<MusicListModelType>(new MusicListModel());
  const showMusicList = (result: ResOptionsModelType<MusicListModelType>) => {
    musicListData.value = result.data;
    setMusicTableDispiay();
  };
  const setMusicTableDispiay = () => {
    musicTableDispiay.value = musicListData.value.list.map((item, index) => {
      return {
        id: item.song_id,
        index: index + 1,
        name: item.song_title,
        singer: item.song_singer,
        cover: item.song_cover,
      }
    })
  }

  // 播放音乐
  // Pinia仓库
  const { musicNowId, musicPlay, musicPause, musicPlayState, musicSkipFromOutside } = toRefs(
    store.useMusicControl()
  );
  const playThisMusic = (row: any) => {
    const music = musicListData.value.list[row.index - 1] as MusicModelType;
    if (music.song_id !== musicNowId.value) {
      console.log('切歌');
      musicSkipFromOutside.value(music);
      // 切歌生效后，播放
      if (musicNowId.value) {
        playingId.value = musicNowId.value;
        if (!musicPlayState.value) {
          musicPlay.value();
        }
      }
    } else {
      console.log('暂停/播放当前歌曲');
      playingId.value = musicNowId.value;
      if (musicPlayState.value) {
        musicPause.value();
      } else {
        musicPlay.value();
      }
    }

  }

</script>

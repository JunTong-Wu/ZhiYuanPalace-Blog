import { defineStore } from "pinia";
import { music } from "@@/models";

const MusicPlayerListItem = music.musicPlayerListItem;

type MusicModelType = music.Music;
type MusicListModelType = music.MusicList;
type MusicPlayerListItemType = music.musicPlayerListItem;
export const useMusicControl = defineStore("musicControl", {
  state: () => {
    return {
      musicNowId: 0,
      musicNowTitle: "",
      musicNowSinger: "",
      musicNowCover: "",
      musicNowAudio: "",
      musicNowLyric: "",
      musicPlayState: false,
      musicLyricState: false,
    };
  },
  getters: {},
  actions: {
    /**
     * 音乐播放/音乐暂停
     */
    togglePlay() {
      this.musicPlayState == false
        ? (this.musicPlayState = true)
        : (this.musicPlayState = false);
    },
    /**
     * 音乐播放
     */
    musicPlay() {
      this.musicPlayState = true;
    },
    /**
     * 音乐暂停
     */
    musicPause() {
      this.musicPlayState = false;
    },
    /**
     * 歌词显示/歌词隐藏
     */
    toggleLyric() {
      this.musicLyricState == false
        ? (this.musicLyricState = true)
        : (this.musicLyricState = false);
    },
    /**
     * 切换到上一首音乐
     */
    musicPrev() {
      // 临时存储当前正在播放的音乐
      let musicNow = {
        id: this.musicNowId,
        title: this.musicNowTitle,
        singer: this.musicNowSinger,
        cover: this.musicNowCover,
        audio: this.musicNowAudio,
        lyric: this.musicNowLyric,
      };
      // 导入播放列表
      const { musicList } = useMusicList();
      // 获取上一首音乐信息
      for (let i = 0; i < musicList.length; i++) {
        if (looseEqual(musicList[i], musicNow)) {
          if (i > 0) {
            musicNow = musicList[i - 1] as any;
          } else {
            musicNow = musicList[musicList.length - 1] as any;
          }
          break;
        }
      }
      // 把上一首音乐信息，设置为当前正在播放的音乐信息
      this.musicNowId = musicNow.id;
      this.musicNowTitle = musicNow.title;
      this.musicNowSinger = musicNow.singer;
      this.musicNowCover = musicNow.cover;
      this.musicNowAudio = musicNow.audio;
      this.musicNowLyric = musicNow.lyric;
    },
    /**
     * 切换到下一首音乐
     */
    musicNext() {
      // 临时存储当前正在播放的音乐
      let musicNow = {
        id: this.musicNowId,
        title: this.musicNowTitle,
        singer: this.musicNowSinger,
        cover: this.musicNowCover,
        audio: this.musicNowAudio,
        lyric: this.musicNowLyric,
      };
      // 导入播放列表
      const { musicList } = useMusicList();
      // 获取下一首音乐信息
      for (let i = 0; i < musicList.length; i++) {
        if (looseEqual(musicList[i], musicNow)) {
          if (i < musicList.length - 1) {
            musicNow = musicList[i + 1] as any;
          } else {
            musicNow = musicList[0] as any;
          }
          break;
        }
      }
      // 把下一首音乐信息，设置为当前正在播放的音乐信息
      this.musicNowId = musicNow.id;
      this.musicNowTitle = musicNow.title;
      this.musicNowSinger = musicNow.singer;
      this.musicNowCover = musicNow.cover;
      this.musicNowAudio = musicNow.audio;
      this.musicNowLyric = musicNow.lyric;
    },
    /**
     * 从播放列表切换音乐
     */
    musicSkipFromList(item: MusicPlayerListItemType) {
      // 获取点击的音乐
      const { id, title, singer, cover, audio, lyric } = item;
      // 把点击的音乐信息，设置为当前正在播放的音乐信息
      this.musicNowId = id;
      this.musicNowTitle = title;
      this.musicNowSinger = singer;
      this.musicNowCover = cover;
      this.musicNowAudio = audio;
      this.musicNowLyric = lyric;
    },
    /**
     * 从外部切换音乐
     */
    musicSkipFromOutside(music: MusicModelType) {
      const item = {
        id: music.song_id,
        title: music.song_title,
        singer: music.song_singer,
        cover: music.song_cover,
        audio: music.song_audio_url,
        lyric: music.song_lyric_url,
      };
      // 获取点击的音乐
      const { id, title, singer, cover, audio, lyric } = item;
      // 把点击的音乐信息，设置为当前正在播放的音乐信息
      this.musicNowId = id;
      this.musicNowTitle = title;
      this.musicNowSinger = singer;
      this.musicNowCover = cover;
      this.musicNowAudio = audio;
      this.musicNowLyric = lyric;
    },
  },
});
export const useMusicList = defineStore("musicList", {
  state: () => {
    return {
      musicList: [new MusicPlayerListItem()] as MusicPlayerListItemType[],
    };
  },
  getters: {},
  actions: {
    setMusicList(musicList: MusicListModelType) {
      const musicPlayerList = <Array<MusicPlayerListItemType>>[];
      for (let i = 0; i < musicList.list.length; i++) {
        const item = musicList.list[i];
        if (item) {
          musicPlayerList.push({
            id: item.song_id,
            title: item.song_title,
            singer: item.song_singer,
            cover: item.song_cover,
            audio: item.song_audio_url,
            lyric: item.song_lyric_url,
          });
        }
      }
      this.musicList = musicPlayerList;
      // 设置当前播放歌曲为第一首
      const { musicSkipFromList } = useMusicControl();
      if (this.musicList[0]) {
        musicSkipFromList(this.musicList[0]);
      }
    },
  },
});

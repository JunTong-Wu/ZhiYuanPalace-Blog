import { defineStore } from "pinia";

export const useMusicControl = defineStore("musicControl", {
  state: () => {
    return {
      musicNowTitle: "幻听",
      musicNowSinger: "许嵩",
      musicNowCover: "/uploads/music/cover/许嵩 - 幻听.jpg",
      musicNowAudio: "/uploads/music/audio/许嵩 - 幻听.ogg",
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
        title: this.musicNowTitle,
        singer: this.musicNowSinger,
        cover: this.musicNowCover,
        audio: this.musicNowAudio,
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
      this.musicNowTitle = musicNow.title;
      this.musicNowSinger = musicNow.singer;
      this.musicNowCover = musicNow.cover;
      this.musicNowAudio = musicNow.audio;
    },
    /**
     * 切换到下一首音乐
     */
    musicNext() {
      // 临时存储当前正在播放的音乐
      let musicNow = {
        title: this.musicNowTitle,
        singer: this.musicNowSinger,
        cover: this.musicNowCover,
        audio: this.musicNowAudio,
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
      this.musicNowTitle = musicNow.title;
      this.musicNowSinger = musicNow.singer;
      this.musicNowCover = musicNow.cover;
      this.musicNowAudio = musicNow.audio;
    },
    /**
     * 从播放列表切换音乐
     */
    musicSkipFromList(item: any) {
      // 获取点击的音乐
      const { title, singer, cover, audio } = item;
      // 把点击的音乐信息，设置为当前正在播放的音乐信息
      this.musicNowTitle = title;
      this.musicNowSinger = singer;
      this.musicNowCover = cover;
      this.musicNowAudio = audio;
    },
  },
});
export const useMusicList = defineStore("musicList", {
  state: () => {
    return {
      musicList: [
        {
          title: "幻听",
          singer: "许嵩",
          cover: "/uploads/music/cover/许嵩 - 幻听.jpg",
          audio: "/uploads/music/audio/许嵩 - 幻听.ogg",
        },
        {
          title: "凌乱的华丽",
          singer: "单色凌",
          cover: "/uploads/music/cover/单色凌 - 凌乱的华丽.jpg",
          audio: "/uploads/music/audio/单色凌 - 凌乱的华丽.ogg",
        },
        {
          title: "一爱难求",
          singer: "九歌",
          cover: "/uploads/music/cover/九歌 - 一爱难求.jpg",
          audio: "/uploads/music/audio/九歌 - 一爱难求.ogg",
        },
        {
          title: "触碰纯白",
          singer: "单色凌",
          cover: "/uploads/music/cover/单色凌 - 触碰纯白.jpg",
          audio: "/uploads/music/audio/单色凌 - 触碰纯白.ogg",
        },
        {
          title: "无名指的约定",
          singer: "回音哥",
          cover: "/uploads/music/cover/回音哥 - 无名指的约定.jpg",
          audio: "/uploads/music/audio/回音哥 - 无名指的约定.ogg",
        },
        {
          title: "大圈圈",
          singer: "安瑞兮",
          cover: "/uploads/music/cover/安瑞兮 - 大圈圈.jpg",
          audio: "/uploads/music/audio/安瑞兮 - 大圈圈.ogg",
        },
        {
          title: "会不会",
          singer: "本兮",
          cover: "/uploads/music/cover/本兮 - 会不会.jpg",
          audio: "/uploads/music/audio/本兮 - 会不会.ogg",
        },
        {
          title: "无底线",
          singer: "本兮",
          cover: "/uploads/music/cover/本兮 - 无底线.jpg",
          audio: "/uploads/music/audio/本兮 - 无底线.ogg",
        },
        {
          title: "有心无意",
          singer: "本兮",
          cover: "/uploads/music/cover/本兮 - 有心无意.jpg",
          audio: "/uploads/music/audio/本兮 - 有心无意.ogg",
        },
        {
          title: "白色",
          singer: "本兮",
          cover: "/uploads/music/cover/本兮 - 白色.jpg",
          audio: "/uploads/music/audio/本兮 - 白色.ogg",
        },
        {
          title: "创作者",
          singer: "本兮 / 徐良",
          cover: "/uploads/music/cover/本兮 _ 徐良 - 创作者.jpg",
          audio: "/uploads/music/audio/本兮 _ 徐良 - 创作者.ogg",
        },
        {
          title: "放不下",
          singer: "汪苏泷",
          cover: "/uploads/music/cover/汪苏泷 - 放不下.jpg",
          audio: "/uploads/music/audio/汪苏泷 - 放不下.ogg",
        },
        {
          title: "月亮警察",
          singer: "火箭少女101",
          cover: "/uploads/music/cover/火箭少女101 - 月亮警察.jpg",
          audio: "/uploads/music/audio/火箭少女101 - 月亮警察.ogg",
        },
        {
          title: "多余的解释",
          singer: "许嵩",
          cover: "/uploads/music/cover/许嵩 - 多余的解释.jpg",
          audio: "/uploads/music/audio/许嵩 - 多余的解释.ogg",
        },
        {
          title: "断桥残雪",
          singer: "许嵩",
          cover: "/uploads/music/cover/许嵩 - 断桥残雪.jpg",
          audio: "/uploads/music/audio/许嵩 - 断桥残雪.ogg",
        },
        {
          title: "玫瑰花的葬礼",
          singer: "许嵩",
          cover: "/uploads/music/cover/许嵩 - 玫瑰花的葬礼.jpg",
          audio: "/uploads/music/audio/许嵩 - 玫瑰花的葬礼.ogg",
        },
        {
          title: "违章动物",
          singer: "许嵩",
          cover: "/uploads/music/cover/许嵩 - 违章动物.jpg",
          audio: "/uploads/music/audio/许嵩 - 违章动物.ogg",
        },
      ],
    };
  },
  getters: {},
  actions: {},
});

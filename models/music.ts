import type { ResOptions } from "./options";

export class Music {
  song_id: number = 0;
  song_sheet_id: number = 0;
  song_title: string = "";
  song_singer: string = "";
  song_cover: string = "";
  song_audio_url: string = "";
  song_lyric_url: string = "";
}

export class musicPlayerListItem {
  title: string = "";
  singer: string = "";
  cover: string = "";
  audio: string = "";
  lyric: string = "";
}

export class MusicList {
  list: Music[] = [];
  total: number = 0;
  constructor() {
    this.list = [new Music()];
  }
}

export interface ApiIndex {
  params: {
    page_numer?: number;
    page_size?: number;
    sheet_pash?: string | null;
  };
  result: ResOptions<MusicList>;
}

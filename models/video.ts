import type { ResOptions } from "./options";
import { Post, Classify } from "./post-common";

export class Video extends Post {
  video_id: number = this.id;
  video_coll_id: number = this.classify_id;
  video_text: string = this.title;
  video_cover: string = "";
  video_path: string = "";
  video_date: string = this.date;
  video_views: number = this.views;
  video_likes: number = this.likes;
  video_comments: number = this.comments;

  video_private: number = 0;
  video_password: string = "";

  has_password: boolean = false;
}

export class VideoCollections extends Classify {
  vi_coll_id: number = this.id;
  vi_coll_path: string = this.path;
  vi_coll_title: string = this.title;
  vi_coll_cover: string = this.cover;
}

export class VideoList {
  list: Video[];
  total: number = 0;
  constructor() {
    this.list = [new Video()];
  }
}

export interface ApiIndex {
  params: {
    page_numer?: number;
    page_size?: number;
    vi_coll_path?: string | null;
  };
  result: ResOptions<VideoList>;
}

export interface ApiShow {
  params: {
    video_id: string;
    video_password?: string;
  };
  result: ResOptions<Video>;
}

import type { ResOptions } from "./options";
import { Post, Classify } from "./post-common";

export class Shuoshuo extends Post {
  shuoshuo_id: number = this.id;
  shuoshuo_coll_id: number = this.classify_id;
  shuoshuo_date: string = this.date;
  shuoshuo_views: number = this.views;
  shuoshuo_likes: number = this.likes;
  shuoshuo_comments: number = this.comments;

  shuoshuo_text: string = "";
  shuoshuo_images: string[] = [];
}

export class ShuoshuoCollection extends Classify {
  sh_coll_id: number = this.id;
  sh_coll_path: string = this.path;
  sh_coll_title: string = this.title;
  sh_coll_cover: string = this.cover;
  sh_coll_father_id: number = this.father_id;
}

export class ShuoshuoList {
  list: Shuoshuo[];
  total: number = 0;
  constructor() {
    this.list = [new Shuoshuo()];
  }
}

export interface ApiIndex {
  params: {
    page_numer?: number;
    page_size?: number;
    coll_path?: string | null;
  };
  result: ResOptions<ShuoshuoList>;
}

export interface ApiShow {
  params: {
    shuoshuo_id: string;
  };
  result: ResOptions<Shuoshuo>;
}

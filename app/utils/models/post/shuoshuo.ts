export interface ShuoshuoListItem {
  sh_coll_cover: null;
  sh_coll_id: number;
  sh_coll_path: string;
  sh_coll_title: string;
  shuoshuo_coll_id: number;
  shuoshuo_comments: number;
  shuoshuo_date: string;
  shuoshuo_id: number;
  shuoshuo_images: string[];
  shuoshuo_likes: number;
  shuoshuo_text: string;
  shuoshuo_views: number;
}

export interface ShuoshuoList {
  list: ShuoshuoListItem[];
  total: number;
}

export const ShuoshuoListItemData: ShuoshuoListItem = {
  sh_coll_cover: null,
  sh_coll_id: 0,
  sh_coll_path: "",
  sh_coll_title: "",
  shuoshuo_coll_id: 0,
  shuoshuo_comments: 0,
  shuoshuo_date: "",
  shuoshuo_id: 0,
  shuoshuo_images: [],
  shuoshuo_likes: 0,
  shuoshuo_text: "",
  shuoshuo_views: 0,
};

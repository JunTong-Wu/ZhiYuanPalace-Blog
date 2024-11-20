export interface AlbumListItem {
  album_comments: number;
  album_cover: string;
  album_id: number;
  album_likes: number;
  album_password: boolean;
  album_path: string;
  album_private: number;
  album_title: string;
  album_views: number;
}

export interface AlbumList {
  list: AlbumListItem[];
  total: number;
}

export const AlbumListItemData: AlbumListItem = {
  album_comments: 0,
  album_cover: "",
  album_id: 0,
  album_likes: 0,
  album_password: false,
  album_path: "",
  album_private: 0,
  album_title: "",
  album_views: 0,
};
export interface PhotoListItem {
  album_comments: number;
  album_cover: string;
  album_id: number;
  album_likes: number;
  album_password: boolean;
  album_path: string;
  album_private: number;
  album_title: string;
  album_views: number;
  photo_album_id: number;
  photo_id: number;
  photo_source_path: string;
  photo_thumbnail_path: string;
}
export interface PhotoList {
  list: PhotoListItem[];
  total: number;
}
export const PhotoListItemData: PhotoListItem = {
  album_comments: 0,
  album_cover: "",
  album_id: 0,
  album_likes: 0,
  album_password: false,
  album_path: "",
  album_private: 0,
  album_title: "",
  album_views: 0,
  photo_album_id: 0,
  photo_id: 0,
  photo_source_path: "",
  photo_thumbnail_path: "",
};

import type { ResOptions } from './options';
import { Post, Classify } from './post-common';

export class Photo extends Post {
  photo_id: number = this.id;
  photo_album_id: number = this.classify_id;

  photo_thumbnail_path: string = '';
  photo_source_path: string = '';
}

export class PhotoAlbum extends Classify {
  album_id: number = this.id;
  album_path: string = this.path;
  album_title: string = this.title;
  album_cover: string = this.cover;
  album_views: number = this.views;
  album_likes: number = this.likes;
  album_comments: number = this.comments;

  album_private: number = 0;
  album_password: string = '';
}

export class PhotoList {
  list: Photo[];
  total: number = 0;
  constructor() {
    this.list = [new Photo()];
  }
}

export class PhotoAlbumList {
  list: PhotoAlbum[];
  total: number = 0;
  constructor() {
    this.list = [new PhotoAlbum()];
  }
}

export interface ApiIndex {
  params: {
    page_numer?: number;
    page_size?: number;
    album_path?: string | null;
  };
  result: ResOptions<PhotoList>;
}

export interface ApiAlbum {
  params: {
    page_numer?: number;
    page_size?: number;
    album_path?: string | null;
  };
  result: ResOptions<PhotoAlbumList>;
}

export interface ApiShow {
  params: {
    photo_id: string;
    photo_password?: string;
  };
  result: ResOptions<Photo>;
}

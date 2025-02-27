import type { ResOptions } from "./options";
import { Post, Classify } from "./post-common";

export class Article extends Post {
  article_id: number = this.id;
  article_classify_id: number = this.classify_id;
  article_title: string = this.title;
  article_date: string = this.date;
  article_views: number = this.views;
  article_likes: number = this.likes;
  article_comments: number = this.comments;

  article_title_image: string = "";
  article_text: string = "";
  article_copyright: string = "";
  article_keywords: string = "";

  article_private: number = 0;
  article_password: string = "";

  has_password: boolean = false;
}

export class ArticleClassify extends Classify {
  classify_id: number = this.id;
  classify_path: string = this.path;
  classify_title: string = this.title;
  classify_cover: string = this.cover;
  classify_father_id: number = this.father_id;
}

export class ArticleList {
  list: Article[];
  total: number = 0;
  constructor() {
    this.list = [new Article()];
  }
}

export interface ApiIndex {
  params: {
    page_numer?: number;
    page_size?: number;
    classify_path?: string | null;
  };
  result: ResOptions<ArticleList>;
}

export interface ApiShow {
  params: {
    article_id: string;
    article_password?: string;
  };
  result: ResOptions<Article>;
}

export interface ApiUpdate {
  params: {
    article_classify_id: number;
    article_title: string;
    article_title_image: string;
    article_text: string;
    article_date: string;
    article_copyright: string;
    article_keywords: string;
    article_private: number;
    article_password: string;
    article_id: number;
  };
  result: ResOptions<null>;
}

export interface ApiAdd {
  params: {
    article_classify_id: number;
    article_title: string;
    article_title_image: string;
    article_text: string;
    article_date: string;
    article_copyright: string;
    article_keywords: string;
    article_private: number;
    article_password: string;
  };
  result: ResOptions<null>;
}

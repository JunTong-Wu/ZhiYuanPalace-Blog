export interface ArticleListItem {
  article_classify_id: number;
  article_id: number;
  article_text: string;
  article_title: string;
  article_title_image: string;
  has_password?: boolean;
  article_comments: number;
  article_copyright: null;
  article_date: string;
  article_keywords: null;
  article_likes: number;
  article_password: boolean;
  article_private: number;
  article_views: number;
  classify_cover: null;
  classify_father_id: number;
  classify_id: number;
  classify_path: string;
  classify_title: string;
}

export interface ArticleList {
  list: ArticleListItem[];
  total: number;
}

export const ArticleListItemData: ArticleListItem = {
  article_classify_id: 0,
  article_id: 0,
  article_text: "",
  article_title: "",
  article_title_image: "",
  has_password: false,
  article_comments: 0,
  article_copyright: null,
  article_date: "",
  article_keywords: null,
  article_likes: 0,
  article_password: false,
  article_private: 0,
  article_views: 0,
  classify_cover: null,
  classify_father_id: 0,
  classify_id: 0,
  classify_path: "",
  classify_title: "",
};

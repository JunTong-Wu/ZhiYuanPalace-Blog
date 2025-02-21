import { article } from '@@/models';
type ArticleModelType = article.Article;

export const articlePasswordFilter = (
  results:
    | {
        code: number;
        message: string;
        data: any[];
      }
    | {
        code: number;
        message: string;
        data: null;
      },
) => {
  let tempArr = <Array<any>>[];
  if (results.data && results.data.length > 0) {
    results.data.forEach((item: any, index: number, array: any) => {
      if (item.article_password !== null) {
        tempArr[index] = {
          article_id: item.article_id,
          article_classify_id: item.article_classify_id,
          article_title: item.article_title,
          article_title_image: item.article_title_image,
          article_text:
            '文章被密码保护，请先输入密码，或者登录管理员账号查看。',
          has_password: true,
        };
      } else {
        tempArr[index] = item;
      }
    });
  }
  return { code: results.code, message: results.message, data: tempArr };
};

export const albumPasswordFilter = (
  results:
    | {
        code: number;
        message: string;
        data: any[];
      }
    | {
        code: number;
        message: string;
        data: null;
      },
) => {
  let tempArr = <Array<any>>[];
  if (results.data && results.data.length > 0) {
    results.data.forEach((item: any, index: number, array: any) => {
      if (item.album_password !== null) {
        tempArr[index] = {
          album_id: item.album_id,
          album_path: item.album_path,
          album_title: item.album_title,
          album_cover: item.album_cover,
          has_password: true,
        };
      } else {
        tempArr[index] = item;
      }
    });
  }
  return { code: results.code, message: results.message, data: tempArr };
};
export const photoPasswordFilter = (
  results:
    | {
        code: number;
        message: string;
        data: any[];
      }
    | {
        code: number;
        message: string;
        data: null;
      },
  albumPassword: string | null,
) => {
  let tempArr = <Array<any>>[];

  if (results.data && results.data.length > 0) {
    results.data.forEach((item: any, index: number, array: any) => {
      if (
        item.album_password !== null &&
        item.album_password !== albumPassword
      ) {
        tempArr[index] = {
          photo_id: item.photo_id,
          album_has_password: true,
        };
      } else {
        tempArr[index] = item;
      }
    });
  }
  return { code: results.code, message: results.message, data: tempArr };
};

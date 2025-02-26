import { article } from "@@/models";
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
  password?: string | null,
) => {
  let tempArr = <Array<any>>[];
  if (results.data && results.data.length > 0) {
    results.data.forEach((item: any, index: number, array: any) => {
      if (
        item.article_password !== null &&
        item.article_password !== "" &&
        item.article_password !== password
      ) {
        tempArr[index] = {
          article_id: item.article_id,
          article_classify_id: item.article_classify_id,
          article_title: item.article_title,
          article_title_image: item.article_title_image,
          article_text: "",
          has_password: true,
        };
      } else {
        tempArr[index] = item;
        delete tempArr[index].article_password;
        delete tempArr[index].article_private;
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
      if (item.album_password !== null && item.album_password !== "") {
        tempArr[index] = {
          album_id: item.album_id,
          album_path: item.album_path,
          album_title: item.album_title,
          album_cover: item.album_cover,
          has_password: true,
        };
      } else {
        tempArr[index] = item;
        delete tempArr[index].album_password;
        delete tempArr[index].album_private;
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
  password?: string | null,
) => {
  let tempArr = <Array<any>>[];

  if (results.data && results.data.length > 0) {
    results.data.forEach((item: any, index: number, array: any) => {
      if (
        item.album_password !== null &&
        item.album_password !== "" &&
        item.album_password !== password
      ) {
        tempArr[index] = {
          photo_id: item.photo_id,
          album_has_password: true,
        };
      } else {
        tempArr[index] = item;
        delete tempArr[index].album_password;
        delete tempArr[index].album_private;
      }
    });
  }
  return { code: results.code, message: results.message, data: tempArr };
};
export const videoPasswordFilter = (
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
  password?: string | null,
) => {
  let tempArr = <Array<any>>[];
  if (results.data && results.data.length > 0) {
    results.data.forEach((item: any, index: number, array: any) => {
      if (
        item.video_password !== null &&
        item.video_password !== "" &&
        item.video_password !== password
      ) {
        tempArr[index] = {
          video_id: item.video_id,
          video_cover: item.video_cover,
          video_text: item.video_text,
          video_date: item.video_date,
          video_views: item.video_views,
          has_password: true,
        };
      } else {
        tempArr[index] = item;
        delete tempArr[index].video_password;
        delete tempArr[index].video_private;
      }
    });
  }
  return { code: results.code, message: results.message, data: tempArr };
};

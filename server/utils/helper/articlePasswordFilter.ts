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
      }
) => {
  let tempArr: any[] = [];
  if (results.data && results.data.length > 0) {
    results.data.forEach((item: any, index: number, array: any) => {
      if (item.article_password !== null) {
        tempArr[index] = {
          article_id: item.article_id,
          article_classify_id: item.article_classify_id,
          article_title: item.article_title,
          article_title_image: item.article_title_image,
          article_text:
            "文章被密码保护，请先输入密码，或者登录管理员账号查看。",
          has_password: true,
        };
      } else {
        tempArr[index] = item;
      }
    });
  }
  return { code: results.code, message: results.message, data: tempArr };
};

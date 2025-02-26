//protected：只能在类和子类中访问，防止外部代码直接访问这些属性，有助于维护代码的结构和安全性。

// 访客三元组：访问量、点赞、评论
export class VisitorTernary {
  protected views: number = 0;
  protected likes: number = 0;
  protected comments: number = 0;
}

// Posts
export class Post extends VisitorTernary {
  protected id: number = 0;
  protected classify_id: number = 0;
  protected title: string = "";
  protected date: string = "";
}

// 分类
export class Classify extends VisitorTernary {
  protected id: number = 0;
  protected path: string = "";
  protected title: string = "";
  protected cover: string = "";
  protected father_id: number = 0;
}

<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>统一类型</h2>
        <h3>模型层概念</h3>
        <p>
          模型层是项目的核心，它定义了项目中的数据结构和业务逻辑。模型层的设计是项目的基础，它决定了项目的扩展性和可维护性。
        </p>
        <h3>传统前端项目的问题</h3>
        <p>
          在传统的前端项目中，由于采用函数式编程，对于模型的定义本就模糊不清。而在使用
          TypeScript
          等类型系统的项目中，由于对于后端模型类型的缺失，导致了代码的可读性和可维护性下降。
        </p>
        <h3>全栈统一类型的解决方案</h3>
        <p>
          在SSR项目中，我们可以通过定义统一的模型层来解决这个问题。统一的模型层可以定义项目中的数据结构和业务逻辑，从而提高代码的可读性和可维护性。
        </p>
        <h3>统一类型的优点</h3>
        <p>
          统一类型的优点主要有以下几个方面：
        </p>
        <ol>
          <li>提高代码的可读性和可维护性</li>
          <li>提高代码的可扩展性</li>
          <li>提高代码的可测试性</li>
        </ol>
        <h3>统一类型的实现</h3>
        <p>
          统一类型的实现主要分为以下几个步骤：
        </p>
        <ol>
            <li>定义统一的模型层</li>
            <li>定义统一的模型层的类型</li>
            <li>定义统一的模型层的接口</li>
            <li>定义统一的模型层的方法</li>
            <li>定义统一的模型层的实例</li>
          </ol>
        <h3>技术细节</h3>
        <p>
          基于 Type Script 对于 <code>class</code> 的支持，借鉴OOB开发的思想基础，将文章类型及其各种变种类型抽象成类，通过 <code>class</code> 同时定义类型和初始值。<br />
          具体表现为：<br />
          通过 <code>extends</code> 继承的方式，实现了类型的复用，从而提高了代码的可维护性。<br />
          通过 <code>interface</code> 接口的方式，实现了API的参数和返回值约束，抹平前后端类型差异，从而保证了数据的一致性。<br />
          通过 <code>type</code> 类型的方式，在前端获取类型，提供完善的补全和校验的开发体验。<br />
          通过 <code>new class</code> 类的方式，实现了数据的初始化，提高项目的统一性和鲁棒性。<br />
        </p>
        <p>具体的类型定义位于 <code>models</code> 目录下，例如：</p>
        <pre><code class="language-typescript">{{ 
`// models/article.ts

// 响应体
export interface ResOptions<T> {
  data: T;
  code: number;
  message: string;
}

// 访客三元组：访问量、点赞、评论
export class VisitorTernary {
  protected views: number = 0;
  protected likes: number = 0;
  protected comments: number = 0;
}

// Posts
export class Post extends VisitorTernary {
  protected id: number = 0;
  protected classify_id: number = 1;
  protected title: string = "";
  protected date: string = "";
}

// 文章
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

// 文章列表
export class ArticleList {
  list: Article[];
  total: number = 0;
  constructor() {
    this.list = [new Article()];
  }
}

// 获取文章列表接口
export interface ApiIndex {
  params: {
    page_numer?: number;
    page_size?: number;
    classify_path?: string | null;
  };
  result: ResOptions<ArticleList>;
}
` 
        }}</code></pre><br />
        <p>在Nuxt3的 <code>server</code> 后端目录中使用：</p>
        <pre><code class="language-typescript">{{ 
`// server/api/article/index/index.post.ts

import { article } from "@@/models";
type ApiIndexModelType = article.ApiIndex;
type Article = article.Article;

export default defineEventHandler(async (event) => {

  // 具体的接口实现......

  // 假设从数据库中获取的数据为 dbResults，包装或处理时，指定item的类型为 Article
  dbResults.data.forEach((item: Article) => {
      if (item.article_text.length > 60) {
        item.article_text = item.article_text.substring(0, 60) + "...";
      }
    });

  // API返回的数据类型为 ApiIndexModelType["result"]
  return setJson(
    { data: { list: dbResults.data, total: total } },
    dbResults,
  ) as ApiIndexModelType["result"];
});
`
        }}</code></pre><br />
        <p>在Nuxt3的 <code>app</code> 前端目录中使用：</p>
        <pre><code class="language-typescript">{{ 
`// server/api/article/index/index.post.ts
import { options } from "@@/models";
import { article } from "@@/models";

// 使用type关键字获取class的类型
type ResOptions<T> = options.ResOptions<T>;
type ResOptionsModelType<T> = ResOptions<T>;

type ArticleListModelType = article.ArticleList;

// 使用时，指定result的类型为 ArticleListModelType，并通过new关键字初始化，设置初始值
const articleListData = ref<ArticleListModelType>(new article.ArticleList());
const showArticleList = (
  result: ResOptionsModelType<ArticleListModelType>,
) => {
  articleListData.value = result.data;
};
`
        }}</code></pre><br />
      </div>
    </div>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import Prism from "prismjs";
  onMounted(() => {
    Prism.highlightAll();
  });
  onUpdated(() => {
    Prism.highlightAll();
  });
</script>

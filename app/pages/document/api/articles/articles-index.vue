<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>文章列表接口</h2>

        <h3>接口说明</h3>
        <p>
          获取博客文章列表，支持分页查询和分类筛选。返回经过处理的文章预览信息，包括文章标题、分类、发布日期等基本信息。
        </p>
        <ul>
          <li>接口URL: <code>/api/articles/index</code></li>
          <li>请求方法: <code>POST</code></li>
          <li>权限要求: 支持匿名访问，登录用户可查看更多信息</li>
        </ul>

        <h3>请求参数</h3>
        <table>
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>必填</th>
              <th>说明</th>
              <th>示例值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>page_numer</td>
              <td>number</td>
              <td>否</td>
              <td>页码，从1开始。不传则返回所有数据</td>
              <td>1</td>
            </tr>
            <tr>
              <td>page_size</td>
              <td>number</td>
              <td>否</td>
              <td>每页条数。不传则返回所有数据</td>
              <td>10</td>
            </tr>
            <tr>
              <td>classify_path</td>
              <td>string</td>
              <td>否</td>
              <td>分类路径，用于筛选特定分类的文章</td>
              <td>"tech"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data: {
    list: Article[]; // 文章列表
    total: number;   // 总条数
  }
}

interface Article {
  article_id: number;           // 文章ID
  article_title: string;        // 文章标题
  article_date: string;         // 发布日期
  article_text: string;         // 文章内容(预览,最多60字)
  article_title_image: string;  // 标题图片
  article_views: number;        // 浏览量
  article_likes: number;        // 点赞数
  article_comments: number;     // 评论数
  article_private: number;      // 是否私密
  has_password: boolean;        // 是否需要密码访问
}</code></pre>

        <h3>响应示例</h3>
        <pre><code class="language-json">{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "article_id": 1,
        "article_title": "示例文章",
        "article_date": "2024-01-01",
        "article_text": "这是一篇示例文章的内容预览...",
        "article_title_image": "https://example.com/image.jpg",
        "article_views": 100,
        "article_likes": 50,
        "article_comments": 10,
        "article_private": 0,
        "has_password": false
      }
    ],
    "total": 1
  }
}</code></pre>

        <h3>特殊说明</h3>

        <h4>文章内容处理</h4>
        <ul>
          <li>
            返回的文章内容(<code>article_text</code>)会被截断至最多60个字符，超出部分用...替代
          </li>
          <li>私密文章(<code>article_private=1</code>)不会在列表中显示</li>
          <li>
            加密文章的内容会被过滤，但会标记<code>has_password=true</code>
          </li>
        </ul>

        <h4>分页说明</h4>
        <ul>
          <li>
            当不传入<code>page_numer</code>和<code>page_size</code>时，将返回所有符合条件的文章
          </li>
          <li>分页参数必须同时提供，否则视为不分页</li>
          <li>页码从1开始计数</li>
        </ul>

        <h4>排序规则</h4>
        <ul>
          <li>文章默认按发布日期(<code>article_date</code>)降序排列</li>
          <li>暂不支持自定义排序</li>
        </ul>

        <h3>错误码说明</h3>
        <table>
          <thead>
            <tr>
              <th>错误码</th>
              <th>说明</th>
              <th>处理建议</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>成功</td>
              <td>-</td>
            </tr>
            <tr>
              <td>500</td>
              <td>服务器错误</td>
              <td>请联系管理员</td>
            </tr>
          </tbody>
        </table>

        <h3>调用示例</h3>

        <h4>基础调用</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/articles/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10
  })
});</code></pre>

        <h4>带分类筛选的调用</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/articles/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10,
    classify_path: 'tech'
  })
});</code></pre>
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

<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>文章详情接口</h2>

        <h3>接口说明</h3>
        <p>
          获取单篇文章的详细信息。支持加密文章的访问，登录用户可以查看更多信息。
        </p>
        <ul>
          <li>接口URL: <code>/api/articles/show</code></li>
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
              <td>article_id</td>
              <td>number</td>
              <td>是</td>
              <td>文章ID</td>
              <td>1</td>
            </tr>
            <tr>
              <td>article_password</td>
              <td>string</td>
              <td>否</td>
              <td>文章密码，访问加密文章时需提供</td>
              <td>"123456"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data: Article;     // 文章详情
}

interface Article {
  article_id: number;           // 文章ID
  article_title: string;        // 文章标题
  article_date: string;         // 发布日期
  article_text: string;         // 文章完整内容
  article_title_image: string;  // 标题图片
  article_views: number;        // 浏览量
  article_likes: number;        // 点赞数
  article_comments: number;     // 评论数
  article_private: number;      // 是否私密
  article_password: string;     // 文章密码
  has_password: boolean;        // 是否需要密码访问
}</code></pre>

        <h3>响应示例</h3>
        <pre><code class="language-json">{
  "code": 0,
  "message": "success",
  "data": {
    "article_id": 1,
    "article_title": "示例文章",
    "article_date": "2024-01-01",
    "article_text": "这是文章的完整内容...",
    "article_title_image": "https://example.com/image.jpg",
    "article_views": 100,
    "article_likes": 50,
    "article_comments": 10,
    "article_private": 0,
    "article_password": "",
    "has_password": false
  }
}</code></pre>

        <h3>特殊说明</h3>

        <h4>文章访问权限</h4>
        <ul>
          <li>普通文章：所有用户可以访问</li>
          <li>加密文章：需要提供正确的 <code>article_password</code></li>
          <li>私密文章(<code>article_private=1</code>)：仅登录用户可访问</li>
        </ul>

        <h4>密码验证</h4>
        <ul>
          <li>访问加密文章时，必须提供正确的密码才能查看文章内容</li>
          <li>密码错误时，文章内容将被过滤</li>
          <li>登录用户可以不受密码限制访问所有文章</li>
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
              <td>404</td>
              <td>文章不存在</td>
              <td>检查文章ID是否正确</td>
            </tr>
            <tr>
              <td>403</td>
              <td>密码错误或无权访问</td>
              <td>检查密码是否正确或登录后访问</td>
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
        <pre><code class="language-typescript">const response = await fetch('/api/articles/show', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    article_id: 1
  })
});</code></pre>

        <h4>访问加密文章</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/articles/show', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    article_id: 1,
    article_password: "123456"
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

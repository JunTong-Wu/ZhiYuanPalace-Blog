<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>编辑文章接口</h2>

        <h3>接口说明</h3>
        <p>
          更新已有文章的信息。支持修改文章的所有属性，包括分类、标题、内容、发布日期等信息，可以更改文章的私密性和访问密码。
        </p>
        <ul>
          <li>接口URL: <code>/api/articles/update</code></li>
          <li>请求方法: <code>POST</code></li>
          <li>权限要求: 必须登录后使用，需要有效的JWT令牌</li>
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
              <td>要编辑的文章ID</td>
              <td>1</td>
            </tr>
            <tr>
              <td>article_classify_id</td>
              <td>number</td>
              <td>是</td>
              <td>文章分类ID</td>
              <td>1</td>
            </tr>
            <tr>
              <td>article_title</td>
              <td>string</td>
              <td>是</td>
              <td>文章标题</td>
              <td>"更新后的文章标题"</td>
            </tr>
            <tr>
              <td>article_title_image</td>
              <td>string</td>
              <td>否</td>
              <td>文章标题图片URL</td>
              <td>"https://example.com/new-image.jpg"</td>
            </tr>
            <tr>
              <td>article_text</td>
              <td>string</td>
              <td>是</td>
              <td>文章内容</td>
              <td>"更新后的文章内容..."</td>
            </tr>
            <tr>
              <td>article_date</td>
              <td>string</td>
              <td>是</td>
              <td>文章发布日期</td>
              <td>"2024-01-01"</td>
            </tr>
            <tr>
              <td>article_copyright</td>
              <td>string</td>
              <td>否</td>
              <td>文章版权信息</td>
              <td>"版权所有©2024"</td>
            </tr>
            <tr>
              <td>article_keywords</td>
              <td>string</td>
              <td>否</td>
              <td>文章关键词</td>
              <td>"技术,博客,更新"</td>
            </tr>
            <tr>
              <td>article_private</td>
              <td>number</td>
              <td>否</td>
              <td>是否私密文章(0:否, 1:是)</td>
              <td>0</td>
            </tr>
            <tr>
              <td>article_password</td>
              <td>string</td>
              <td>否</td>
              <td>文章访问密码</td>
              <td>"newpassword"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data: null;        // 无返回数据
}</code></pre>

        <h3>响应示例</h3>
        <pre><code class="language-json">{
  "code": 0,
  "message": "文章修改成功",
  "data": null
}</code></pre>

        <h3>特殊说明</h3>

        <h4>权限验证</h4>
        <ul>
          <li>必须携带有效的JWT令牌才能调用此接口</li>
          <li>未登录或令牌失效将返回401错误</li>
        </ul>

        <h4>更新规则</h4>
        <ul>
          <li>所有必填字段都必须提供，即使不需要修改</li>
          <li>选填字段如果不需要修改，可以传入原值或空值</li>
          <li>文章ID必须存在，否则更新将失败</li>
        </ul>

        <h4>文章属性变更</h4>
        <ul>
          <li>可以通过修改<code>article_private</code>切换文章的私密状态</li>
          <li>
            可以通过设置或清空<code>article_password</code>修改文章的访问限制
          </li>
          <li>修改分类ID时请确保目标分类存在</li>
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
              <td>401</td>
              <td>未登录或登录失效</td>
              <td>请先登录或更新令牌</td>
            </tr>
            <tr>
              <td>404</td>
              <td>文章不存在</td>
              <td>检查文章ID是否正确</td>
            </tr>
            <tr>
              <td>500</td>
              <td>服务器错误</td>
              <td>请联系管理员</td>
            </tr>
          </tbody>
        </table>

        <h3>调用示例</h3>

        <h4>基础更新</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/articles/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify({
    article_id: 1,
    article_classify_id: 1,
    article_title: "更新后的文章标题",
    article_text: "更新后的文章内容...",
    article_date: "2024-01-01"
  })
});</code></pre>

        <h4>修改文章属性</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/articles/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify({
    article_id: 1,
    article_classify_id: 2,
    article_title: "更新后的文章标题",
    article_text: "更新后的文章内容...",
    article_date: "2024-01-01",
    article_private: 1,
    article_password: "newpassword"
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

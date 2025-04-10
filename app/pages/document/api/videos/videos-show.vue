<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>视频详情接口</h2>

        <h3>接口说明</h3>
        <p>获取单个视频的详细信息。支持加密视频的访问，需要提供正确的密码。</p>
        <ul>
          <li>接口URL: <code>/api/videos/show</code></li>
          <li>请求方法: <code>POST</code></li>
          <li>权限要求: 支持未登录访问，但登录后可查看更多信息</li>
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
              <td>video_id</td>
              <td>number</td>
              <td>是</td>
              <td>视频ID</td>
              <td>1</td>
            </tr>
            <tr>
              <td>video_password</td>
              <td>string</td>
              <td>否</td>
              <td>视频访问密码，加密视频必填</td>
              <td>"123456"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    video_id: number;        // 视频ID
    video_title: string;     // 视频标题
    video_text: string;      // 视频描述
    video_date: string;      // 发布日期
    video_private: number;   // 是否私密(0:否, 1:是)
    video_password?: string; // 访问密码(加密视频才有)
    video_url: string;      // 视频URL
    video_cover: string;    // 视频封面
    vi_coll_id: number;     // 分类ID
  };
}</code></pre>

        <h3>响应示例</h3>
        <h4>普通视频</h4>
        <pre><code class="language-json">{
  "code": 0,
  "message": "success",
  "data": {
    "video_id": 1,
    "video_title": "示例视频",
    "video_text": "这是一个示例视频的完整描述",
    "video_date": "2024-01-01",
    "video_private": 0,
    "video_url": "https://example.com/video.mp4",
    "video_cover": "https://example.com/cover.jpg",
    "vi_coll_id": 1
  }
}</code></pre>

        <h4>加密视频(密码错误)</h4>
        <pre><code class="language-json">{
  "code": 401,
  "message": "需要密码访问",
  "data": {
    "video_id": 2,
    "video_title": "加密视频",
    "video_text": "这个视频需要密码才能访问",
    "video_date": "2024-01-01",
    "video_private": 0,
    "video_password": "******",
    "vi_coll_id": 1
  }
}</code></pre>

        <h3>特殊说明</h3>

        <h4>访问控制</h4>
        <ul>
          <li>私密视频只有登录用户可以访问</li>
          <li>加密视频需要提供正确的密码才能查看完整信息</li>
          <li>管理员登录后可以查看所有视频的完整信息</li>
        </ul>

        <h4>内容处理</h4>
        <ul>
          <li>视频描述不会被截断，返回完整内容</li>
          <li>加密视频在密码错误时，敏感信息会被隐藏</li>
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
              <td>需要密码访问</td>
              <td>提供正确的访问密码</td>
            </tr>
            <tr>
              <td>404</td>
              <td>视频不存在</td>
              <td>检查视频ID是否正确</td>
            </tr>
            <tr>
              <td>500</td>
              <td>服务器错误</td>
              <td>请联系管理员</td>
            </tr>
          </tbody>
        </table>

        <h3>调用示例</h3>
        <h4>普通视频访问</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/videos/show', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    video_id: 1
  })
});</code></pre>

        <h4>加密视频访问</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/videos/show', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    video_id: 2,
    video_password: "123456"
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

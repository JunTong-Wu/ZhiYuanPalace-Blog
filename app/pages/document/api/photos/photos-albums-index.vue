<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>相册列表接口</h2>

        <h3>接口说明</h3>
        <p>
          获取相册列表。支持分页查询和路径筛选，会过滤私密相册，并对加密相册进行特殊处理。
        </p>
        <ul>
          <li>接口URL: <code>/api/photos/albums/index</code></li>
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
              <td>page_numer</td>
              <td>number</td>
              <td>否</td>
              <td>页码，不传则返回全部数据</td>
              <td>1</td>
            </tr>
            <tr>
              <td>page_size</td>
              <td>number</td>
              <td>否</td>
              <td>每页条数，不传则返回全部数据</td>
              <td>10</td>
            </tr>
            <tr>
              <td>album_path</td>
              <td>string</td>
              <td>否</td>
              <td>相册路径</td>
              <td>"travel"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    list: Array<{
      album_id: number;        // 相册ID
      album_title: string;     // 相册标题
      album_description: string;// 相册描述
      album_cover: string;     // 相册封面
      album_date: string;      // 创建日期
      album_private: number;   // 是否私密(0:否, 1:是)
      album_password?: string; // 访问密码(加密相册才有)
      album_path: string;      // 相册路径
    }>;
    total: number;            // 总条数
  };
}</code></pre>

        <h3>响应示例</h3>
        <pre><code class="language-json">{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "album_id": 1,
        "album_title": "旅行相册",
        "album_description": "记录美好时光",
        "album_cover": "https://example.com/cover.jpg",
        "album_date": "2024-01-01",
        "album_private": 0,
        "album_path": "travel"
      }
    ],
    "total": 1
  }
}</code></pre>

        <h3>特殊说明</h3>

        <h4>分页机制</h4>
        <ul>
          <li>
            当<code>page_numer</code>和<code>page_size</code>都不传时，返回全部数据
          </li>
          <li>分页从第1页开始，每页大小由<code>page_size</code>决定</li>
        </ul>

        <h4>访问控制</h4>
        <ul>
          <li>私密相册会被过滤，不会出现在返回列表中</li>
          <li>加密相册的敏感信息会被隐藏，需要通过密码验证接口获取访问权限</li>
          <li>登录用户可以查看更多相册信息</li>
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
        <h4>基础查询</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/photos/albums/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10
  })
});</code></pre>

        <h4>路径筛选</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/photos/albums/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10,
    album_path: 'travel'
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

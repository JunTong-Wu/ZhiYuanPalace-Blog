<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>照片列表接口</h2>

        <h3>接口说明</h3>
        <p>
          获取照片列表。支持分页查询和相册筛选，会过滤私密相册的照片，并对加密相册的照片进行特殊处理。
        </p>
        <ul>
          <li>接口URL: <code>/api/photos/index</code></li>
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
            <tr>
              <td>album_password</td>
              <td>string</td>
              <td>否</td>
              <td>相册访问密码，访问加密相册时必填</td>
              <td>"123456"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    list: Array<{
      photo_id: number;        // 照片ID
      photo_title: string;     // 照片标题
      photo_description: string;// 照片描述
      photo_url: string;       // 照片URL
      photo_thumbnail: string; // 缩略图URL
      photo_date: string;      // 拍摄日期
      photo_album_id: number;  // 所属相册ID
      album_title: string;     // 相册标题
      album_path: string;      // 相册路径
      album_private: number;   // 相册是否私密(0:否, 1:是)
      album_password?: string; // 相册访问密码(加密相册才有)
    }>;
    total: number;            // 总条数
  };
}</code></pre>

        <h3>响应示例</h3>
        <h4>普通相册照片</h4>
        <pre><code class="language-json">{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "photo_id": 1,
        "photo_title": "美丽风景",
        "photo_description": "旅行中拍摄的风景照",
        "photo_url": "https://example.com/photo.jpg",
        "photo_thumbnail": "https://example.com/thumbnail.jpg",
        "photo_date": "2024-01-01",
        "photo_album_id": 1,
        "album_title": "旅行相册",
        "album_path": "travel",
        "album_private": 0
      }
    ],
    "total": 1
  }
}</code></pre>

        <h4>加密相册照片(密码错误)</h4>
        <pre><code class="language-json">{
  "code": 401,
  "message": "需要密码访问",
  "data": {
    "list": [
      {
        "photo_id": 2,
        "photo_title": "加密照片",
        "photo_description": "此照片需要密码访问",
        "photo_thumbnail": "https://example.com/placeholder.jpg",
        "photo_date": "2024-01-01",
        "photo_album_id": 2,
        "album_title": "私密相册",
        "album_path": "private",
        "album_private": 0,
        "album_password": "******"
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
          <li>返回数据按照照片ID降序排列（最新的照片在前）</li>
        </ul>

        <h4>访问控制</h4>
        <ul>
          <li>私密相册的照片会被过滤，不会出现在返回列表中</li>
          <li>加密相册的照片需要提供正确的相册密码才能查看原图</li>
          <li>未提供密码或密码错误时，加密相册的照片只显示缩略图</li>
          <li>登录用户可以查看更多照片信息</li>
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
              <td>提供正确的相册密码</td>
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
        <pre><code class="language-typescript">const response = await fetch('/api/photos/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10
  })
});</code></pre>

        <h4>访问加密相册</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/photos/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10,
    album_path: 'private',
    album_password: '123456'
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

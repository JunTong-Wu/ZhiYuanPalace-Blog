<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>友链列表接口</h2>

        <h3>接口说明</h3>
        <p>获取所有友链信息。返回友链的基本信息和所属分类。</p>
        <ul>
          <li>接口URL: <code>/api/friends/index</code></li>
          <li>请求方法: <code>POST</code></li>
          <li>权限要求: 无需登录即可访问</li>
        </ul>

        <h3>请求参数</h3>
        <p>此接口无需请求参数。</p>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    list: Array<{
      friend_id: number;      // 友链ID
      friend_name: string;    // 友链名称
      friend_url: string;     // 友链地址
      friend_avatar: string;  // 友链头像
      friend_desc: string;    // 友链描述
      friend_coll_id: number; // 分类ID
      frd_coll_name: string;  // 分类名称
      frd_coll_path: string;  // 分类路径
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
        "friend_id": 1,
        "friend_name": "示例博客",
        "friend_url": "https://example.com",
        "friend_avatar": "https://example.com/avatar.jpg",
        "friend_desc": "一个示例博客",
        "friend_coll_id": 1,
        "frd_coll_name": "技术博客",
        "frd_coll_path": "tech"
      }
    ],
    "total": 1
  }
}</code></pre>

        <h3>特殊说明</h3>

        <h4>数据排序</h4>
        <ul>
          <li>返回的友链按照ID升序排列</li>
          <li>同一分类下的友链会被分组在一起</li>
        </ul>

        <h4>友链信息</h4>
        <ul>
          <li>友链头像支持多种图片格式</li>
          <li>友链描述可能为空</li>
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
        <pre><code class="language-typescript">const response = await fetch('/api/friends/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
if (result.code === 0) {
  // 获取成功，显示友链列表
  console.log('友链列表:', result.data.list);
  console.log('友链总数:', result.data.total);
} else {
  // 获取失败，显示错误信息
  console.error(result.message);
}</code></pre>
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

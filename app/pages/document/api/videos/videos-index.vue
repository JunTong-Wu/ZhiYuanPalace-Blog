<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>视频列表接口</h2>

        <h3>接口说明</h3>
        <p>
          获取视频列表。支持分页查询和分类筛选，会过滤私密视频，并对加密视频进行特殊处理。
        </p>
        <ul>
          <li>接口URL: <code>/api/videos/index</code></li>
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
              <td>vi_coll_path</td>
              <td>string</td>
              <td>否</td>
              <td>视频分类路径</td>
              <td>"games"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    list: Array<{
      video_id: number;        // 视频ID
      video_title: string;     // 视频标题
      video_text: string;      // 视频描述(超过60字符会被截断)
      video_date: string;      // 发布日期
      video_private: number;   // 是否私密(0:否, 1:是)
      video_password?: string; // 访问密码(加密视频才有)
      vi_coll_id: number;     // 分类ID
      vi_coll_name: string;   // 分类名称
      vi_coll_path: string;   // 分类路径
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
        "video_id": 1,
        "video_title": "示例视频",
        "video_text": "这是一个示例视频的描述...",
        "video_date": "2024-01-01",
        "video_private": 0,
        "vi_coll_id": 1,
        "vi_coll_name": "游戏视频",
        "vi_coll_path": "games"
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
          <li>返回数据按发布日期降序排列</li>
        </ul>

        <h4>内容处理</h4>
        <ul>
          <li>视频描述超过60字符会被截断，末尾添加"..."</li>
          <li>私密视频会被过滤，不会出现在返回列表中</li>
          <li>加密视频的具体内容会被隐藏，需要通过详情接口获取</li>
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
        <pre><code class="language-typescript">const response = await fetch('/api/videos/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10
  })
});</code></pre>

        <h4>分类筛选</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/videos/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10,
    vi_coll_path: 'games'
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

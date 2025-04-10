<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>音乐列表接口</h2>

        <h3>接口说明</h3>
        <p>获取音乐列表。支持分页查询和歌单筛选，返回音乐的基本信息。</p>
        <ul>
          <li>接口URL: <code>/api/music/index</code></li>
          <li>请求方法: <code>POST</code></li>
          <li>权限要求: 无需登录即可访问</li>
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
              <td>sheet_pash</td>
              <td>string</td>
              <td>否</td>
              <td>歌单路径</td>
              <td>"favorite"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    list: Array<{
      song_id: number;        // 音乐ID
      song_title: string;     // 音乐标题
      song_artist: string;    // 艺术家
      song_album: string;     // 专辑名
      song_cover: string;     // 封面图片URL
      song_url: string;       // 音乐文件URL
      song_sheet_id: number;  // 歌单ID
      sheet_name: string;     // 歌单名称
      sheet_pash: string;     // 歌单路径
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
        "song_id": 1,
        "song_title": "示例音乐",
        "song_artist": "演唱者",
        "song_album": "专辑名称",
        "song_cover": "https://example.com/cover.jpg",
        "song_url": "https://example.com/music.mp3",
        "song_sheet_id": 1,
        "sheet_name": "我喜欢的音乐",
        "sheet_pash": "favorite"
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
          <li>返回数据按音乐ID降序排列（最新添加的音乐在前）</li>
        </ul>

        <h4>音乐文件</h4>
        <ul>
          <li>音乐文件URL支持直接播放</li>
          <li>封面图片支持多种尺寸，可以根据需要选择合适的大小</li>
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
        <pre><code class="language-typescript">const response = await fetch('/api/music/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10
  })
});</code></pre>

        <h4>歌单筛选</h4>
        <pre><code class="language-typescript">const response = await fetch('/api/music/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10,
    sheet_pash: 'favorite'
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

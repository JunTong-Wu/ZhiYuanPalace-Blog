<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>说说列表接口</h2>

        <h3>接口说明</h3>
        <p>
          获取说说列表。支持分页查询和分类筛选，返回的说说内容会进行长度限制。
        </p>
        <ul>
          <li>接口URL: <code>/api/shuoshuos/index</code></li>
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
              <td>coll_path</td>
              <td>string</td>
              <td>否</td>
              <td>分类路径</td>
              <td>"daily"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    list: Array<{
      shuoshuo_id: number;     // 说说ID
      shuoshuo_text: string;   // 说说内容(超过60字符会被截断)
      shuoshuo_date: string;   // 发布日期
      shuoshuo_coll_id: number;// 分类ID
      sh_coll_name: string;    // 分类名称
      sh_coll_path: string;    // 分类路径
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
        "shuoshuo_id": 1,
        "shuoshuo_text": "今天天气真好，出去散步了一圈，遇到了很多有趣的事情...",
        "shuoshuo_date": "2024-01-01",
        "shuoshuo_coll_id": 1,
        "sh_coll_name": "日常生活",
        "sh_coll_path": "daily"
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
          <li>返回数据按发布日期降序排列（最新的说说在前）</li>
        </ul>

        <h4>内容处理</h4>
        <ul>
          <li>说说内容超过60字符会被截断，末尾添加"..."</li>
          <li>如需查看完整内容，请使用说说详情接口</li>
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
        <pre><code class="language-typescript">const response = await fetch('/api/shuoshuos/index', {
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
        <pre><code class="language-typescript">const response = await fetch('/api/shuoshuos/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page_numer: 1,
    page_size: 10,
    coll_path: 'daily'
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

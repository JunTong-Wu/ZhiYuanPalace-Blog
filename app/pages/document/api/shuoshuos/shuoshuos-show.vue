<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>说说详情接口</h2>

        <h3>接口说明</h3>
        <p>获取单条说说的详细信息。返回说说的完整内容和相关信息。</p>
        <ul>
          <li>接口URL: <code>/api/shuoshuos/show</code></li>
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
              <td>shuoshuo_id</td>
              <td>number</td>
              <td>是</td>
              <td>说说ID</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    shuoshuo_id: number;     // 说说ID
    shuoshuo_text: string;   // 说说内容
    shuoshuo_date: string;   // 发布日期
    shuoshuo_coll_id: number;// 分类ID
  };
}</code></pre>

        <h3>响应示例</h3>
        <pre><code class="language-json">{
  "code": 0,
  "message": "success",
  "data": {
    "shuoshuo_id": 1,
    "shuoshuo_text": "今天天气真好，出去散步了一圈，遇到了很多有趣的事情。在公园里看到了一群小朋友在玩耍，他们的笑声让整个下午都充满了欢乐。回家的路上买了一杯奶茶，感觉生活真美好。",
    "shuoshuo_date": "2024-01-01",
    "shuoshuo_coll_id": 1
  }
}</code></pre>

        <h3>特殊说明</h3>

        <h4>内容处理</h4>
        <ul>
          <li>返回说说的完整内容，不会进行截断</li>
          <li>支持富文本内容的展示</li>
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
              <td>说说不存在</td>
              <td>检查说说ID是否正确</td>
            </tr>
            <tr>
              <td>500</td>
              <td>服务器错误</td>
              <td>请联系管理员</td>
            </tr>
          </tbody>
        </table>

        <h3>调用示例</h3>
        <pre><code class="language-typescript">const response = await fetch('/api/shuoshuos/show', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    shuoshuo_id: 1
  })
});

const result = await response.json();
if (result.code === 0) {
  // 获取成功，显示说说详情
  console.log(result.data);
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

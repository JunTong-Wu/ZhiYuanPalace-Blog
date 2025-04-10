<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>视频密码验证接口</h2>

        <h3>接口说明</h3>
        <p>
          验证加密视频的访问密码是否正确。用于在访问加密视频前进行密码验证。
        </p>
        <ul>
          <li>接口URL: <code>/api/videos/password-verify</code></li>
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
              <td>id</td>
              <td>number</td>
              <td>是</td>
              <td>视频ID</td>
              <td>1</td>
            </tr>
            <tr>
              <td>password</td>
              <td>string</td>
              <td>是</td>
              <td>视频访问密码</td>
              <td>"123456"</td>
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
        <h4>验证成功</h4>
        <pre><code class="language-json">{
  "code": 0,
  "message": "密码正确",
  "data": null
}</code></pre>

        <h4>验证失败</h4>
        <pre><code class="language-json">{
  "code": 401,
  "message": "密码错误",
  "data": null
}</code></pre>

        <h3>特殊说明</h3>

        <h4>使用场景</h4>
        <ul>
          <li>在访问加密视频前，可以先调用此接口验证密码</li>
          <li>验证通过后，可以使用相同的密码调用视频详情接口</li>
          <li>此接口不会返回视频信息，仅验证密码是否正确</li>
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
              <td>密码正确，可以访问视频</td>
            </tr>
            <tr>
              <td>400</td>
              <td>参数错误</td>
              <td>检查ID和密码是否都已提供</td>
            </tr>
            <tr>
              <td>401</td>
              <td>密码错误</td>
              <td>检查密码是否正确</td>
            </tr>
            <tr>
              <td>404</td>
              <td>视频不存在</td>
              <td>检查视频ID是否正确</td>
            </tr>
          </tbody>
        </table>

        <h3>调用示例</h3>
        <pre><code class="language-typescript">const response = await fetch('/api/videos/password-verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 1,
    password: "123456"
  })
});

const result = await response.json();
if (result.code === 0) {
  // 密码正确，可以访问视频
  console.log('密码验证通过');
} else {
  // 密码错误或其他错误
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

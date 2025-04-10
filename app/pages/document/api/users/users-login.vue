<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>用户登录接口</h2>

        <h3>接口说明</h3>
        <p>用户登录认证接口。验证用户名和密码，成功后返回用户信息和JWT令牌。</p>
        <ul>
          <li>接口URL: <code>/api/users/login</code></li>
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
              <td>username</td>
              <td>string</td>
              <td>是</td>
              <td>用户名</td>
              <td>"admin"</td>
            </tr>
            <tr>
              <td>password</td>
              <td>string</td>
              <td>是</td>
              <td>密码</td>
              <td>"password123"</td>
            </tr>
          </tbody>
        </table>

        <h3>响应结构</h3>
        <pre><code class="language-typescript">interface Response {
  code: number;      // 状态码
  message: string;   // 响应消息
  data?: {
    id: number;      // 用户ID
    username: string;// 用户名
    token: string;   // JWT令牌
    [key: string]: any; // 其他用户信息
  };
}</code></pre>

        <h3>响应示例</h3>
        <h4>登录成功</h4>
        <pre><code class="language-json">{
  "code": 0,
  "message": "登录成功",
  "data": {
    "id": 1,
    "username": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}</code></pre>

        <h4>登录失败</h4>
        <pre><code class="language-json">{
  "code": 401,
  "message": "密码错误"
}</code></pre>

        <h3>特殊说明</h3>

        <h4>密码加密</h4>
        <ul>
          <li>密码在传输前应进行加密处理</li>
          <li>服务端会将密码与数据库中存储的加密密码进行比对</li>
        </ul>

        <h4>Token说明</h4>
        <ul>
          <li>登录成功后返回的token需要在后续请求中携带</li>
          <li>token有效期为配置的过期时间</li>
          <li>
            token应放在请求头的Authorization字段中，格式为：<code
              >Bearer your-token</code
            >
          </li>
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
              <td>400</td>
              <td>用户名或密码为空/用户不存在</td>
              <td>检查输入的用户名是否正确</td>
            </tr>
            <tr>
              <td>401</td>
              <td>密码错误</td>
              <td>检查输入的密码是否正确</td>
            </tr>
          </tbody>
        </table>

        <h3>调用示例</h3>
        <pre><code class="language-typescript">const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'password123'
  })
});

const result = await response.json();
if (result.code === 0) {
  // 登录成功，保存token
  localStorage.setItem('token', result.data.token);
} else {
  // 登录失败，显示错误信息
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

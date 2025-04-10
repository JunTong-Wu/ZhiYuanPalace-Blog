<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>仪表盘数据接口</h2>

        <h3>接口说明</h3>
        <p>获取系统仪表盘数据，包括内容统计信息和服务器系统信息。</p>
        <ul>
          <li>接口URL: <code>/api/dashboard/index</code></li>
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
    posts_number: {
      total: number;     // 内容总数
      article: number;   // 文章数量
      shuoshuo: number; // 说说数量
      video: number;    // 视频数量
      photo: number;    // 照片数量
    };
    os_info: {
      sys_version: string;  // 系统版本
      sys_uptime: number;   // 系统运行时间(秒)
      cpu_platform: string; // CPU平台
      cpu_arch: string;     // CPU架构
      cpu_count: number;    // CPU核心数
      cpu_model: string;    // CPU型号
      cpu_speed: number;    // CPU频率(MHz)
      cpu_use: number;      // CPU使用率(%)
      cpu_free: number;     // CPU空闲率(%)
      ram_totalmem: number; // 总内存(字节)
      ram_freemem: number;  // 空闲内存(字节)
    };
  };
}</code></pre>

        <h3>响应示例</h3>
        <pre><code class="language-json">{
  "code": 0,
  "message": "success",
  "data": {
    "posts_number": {
      "total": 100,
      "article": 30,
      "shuoshuo": 40,
      "video": 10,
      "photo": 20
    },
    "os_info": {
      "sys_version": "Windows 10.0.19045",
      "sys_uptime": 86400,
      "cpu_platform": "win32",
      "cpu_arch": "x64",
      "cpu_count": 8,
      "cpu_model": "Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz",
      "cpu_speed": 3800,
      "cpu_use": 25.5,
      "cpu_free": 74.5,
      "ram_totalmem": 17179869184,
      "ram_freemem": 8589934592
    }
  }
}</code></pre>

        <h3>特殊说明</h3>

        <h4>内容统计</h4>
        <ul>
          <li>统计包括所有公开和私密内容</li>
          <li>总数是所有类型内容的总和</li>
        </ul>

        <h4>系统信息</h4>
        <ul>
          <li>系统运行时间以秒为单位</li>
          <li>CPU使用率和空闲率为百分比值</li>
          <li>内存大小以字节为单位</li>
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
        <pre><code class="language-typescript">const response = await fetch('/api/dashboard/index', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
if (result.code === 0) {
  // 获取成功，显示仪表盘数据
  console.log('内容统计:', result.data.posts_number);
  console.log('系统信息:', result.data.os_info);
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

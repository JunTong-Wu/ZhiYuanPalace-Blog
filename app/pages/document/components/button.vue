<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h1>按钮 Button</h1>
        <p>按钮是一种命令组件，可发起一个即时操作。</p>
        <h2>基本用法</h2>
        <p>
          按钮分为 <code>default</code> 默认按钮、
          <code>linear</code> 线形按钮、 <code>icon</code> 图标按钮和
          <code>text</code> 文本按钮四种。
        </p>
        <ZyCompDemo ref="typeDemoRef">
          <div class="flex gap-4 items-center">
            <ZyButton>默认按钮</ZyButton>
            <ZyButton type="linear">线形按钮</ZyButton>
            <ZyButton type="icon">
              <UIcon name="i-solar-planet-linear" />
            </ZyButton>
            <ZyButton type="text">文本按钮</ZyButton>
          </div>
        </ZyCompDemo>
        <h2>按钮尺寸</h2>
        <p>
          按钮提供了 <code>large</code> 大尺寸、<code>medium</code> 中尺寸和
          <code>small</code> 小尺寸三种尺寸。推荐（默认）尺寸为
          <code>medium</code>。可在不同场景及不同业务需求选择适合尺寸。
        </p>
        <ZyCompDemo ref="sizeDemoRef">
          <div class="flex gap-4 items-center mb-4">
            <ZyButton size="large">大尺寸按钮</ZyButton>
            <ZyButton size="medium">中尺寸按钮</ZyButton>
            <ZyButton size="small">小尺寸按钮</ZyButton>
          </div>
          <div class="flex gap-4 items-center mb-4">
            <ZyButton
              size="large"
              type="linear"
              >大尺寸按钮</ZyButton
            >
            <ZyButton
              size="medium"
              type="linear"
              >中尺寸按钮</ZyButton
            >
            <ZyButton
              size="small"
              type="linear"
              >小尺寸按钮</ZyButton
            >
          </div>
          <div class="flex gap-4 items-center mb-4">
            <ZyButton
              size="large"
              type="icon"
              ><UIcon name="i-solar-planet-linear"
            /></ZyButton>
            <ZyButton
              size="medium"
              type="icon"
              ><UIcon name="i-solar-planet-linear"
            /></ZyButton>
            <ZyButton
              size="small"
              type="icon"
              ><UIcon name="i-solar-planet-linear"
            /></ZyButton>
          </div>
          <div class="flex gap-4 items-center mb-4">
            <ZyButton
              size="large"
              type="text"
              >大尺寸按钮</ZyButton
            >
            <ZyButton
              size="medium"
              type="text"
              >中尺寸按钮</ZyButton
            >
            <ZyButton
              size="small"
              type="text"
              >小尺寸按钮</ZyButton
            >
          </div>
        </ZyCompDemo>
        <h2>按钮颜色</h2>
        <p>
          按钮可以设置颜色。可以接收任何CSS颜色字符串，如
          <code>#f00</code>、<code>rgb(255, 0, 0)</code>、
          <code>hsl(0, 100%, 50%)</code>
          或CSS令牌。推荐（默认）颜色为
          <code>var(--theme-color)</code> 主题色。
        </p>
        <ZyCompDemo ref="colorDemoRef">
          <div class="flex gap-4 items-center">
            <ZyButton color="var(--theme-color)">默认按钮</ZyButton>
            <ZyButton color="#c01b16">红色按钮</ZyButton>
            <ZyButton color="rgb(0 151 87)">绿色按钮</ZyButton>
            <ZyButton color="hsl(208 100% 53.58%)">蓝色按钮</ZyButton>
          </div>
        </ZyCompDemo>
        <h2>禁用状态</h2>
        <p>
          按钮可以设置为禁用状态，禁用状态下按钮不可点击，并且会有灰色的遮罩。
        </p>
        <ZyCompDemo ref="disabledDemoRef">
          <div class="flex gap-4 items-center">
            <ZyButton disabled>默认按钮</ZyButton>
            <ZyButton
              type="linear"
              disabled
              >线形按钮</ZyButton
            >
            <ZyButton
              type="icon"
              disabled
            >
              <UIcon name="i-solar-planet-linear" />
            </ZyButton>
            <ZyButton
              type="text"
              disabled
              >文本按钮</ZyButton
            >
          </div>
        </ZyCompDemo>
        <h2>加载中状态</h2>
        <p>
          按钮可以设置为加载中状态，加载中状态下按钮不可点击，并且会有灰色的遮罩。
        </p>
        <ZyCompDemo ref="loadingDemoRef">
          <div class="flex gap-4 items-center">
            <ZyButton loading>默认按钮</ZyButton>
            <ZyButton
              type="linear"
              loading
              >线形按钮</ZyButton
            >
            <ZyButton
              type="icon"
              loading
            >
              <UIcon name="i-solar-planet-linear" />
            </ZyButton>
            <ZyButton
              type="text"
              loading
              >文本按钮</ZyButton
            >
          </div>
        </ZyCompDemo>
        <h2>API</h2>
        <h3><code>&lt;button&gt;</code> Props</h3>
        <table>
          <colgroup>
            <col style="min-width: 120px" />
          </colgroup>
          <thead>
            <tr>
              <th>参数名</th>
              <th>描述</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>type</td>
              <td>按钮的类型</td>
              <td>default | linear | text | icon</td>
              <td>default</td>
            </tr>
            <tr>
              <td>size</td>
              <td>按钮的尺寸</td>
              <td>large | medium | small</td>
              <td>medium</td>
            </tr>
            <tr>
              <td>color</td>
              <td>按钮的颜色</td>
              <td>string</td>
              <td>var(--theme-color)</td>
            </tr>
            <tr>
              <td>loading</td>
              <td>按钮的加载状态</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>按钮的禁用状态</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
        <h3><code>&lt;button&gt;</code> Events</h3>
        <table>
          <colgroup>
            <col style="min-width: 120px" />
          </colgroup>
          <thead>
            <tr>
              <th>事件名</th>
              <th>描述</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>click</td>
              <td>点击按钮时触发</td>
              <td>ev: MouseEvent</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CommonMainSection>
</template>
<script setup>
  const typeDemoRef = ref(null);
  const sizeDemoRef = ref(null);
  const colorDemoRef = ref(null);
  const disabledDemoRef = ref(null);
  const loadingDemoRef = ref(null);

  const setDemoCode = () => {
    // 基本用法代码
    const typeDemoCode = `
<div class="flex gap-4">
  <ZyButton>默认按钮</ZyButton>
  <ZyButton type="linear">线形按钮</ZyButton>
  <ZyButton type="icon">
    <UIcon name="i-solar-planet-linear" />
  </ZyButton>
  <ZyButton type="text">文本按钮</ZyButton>
</div>
    `;
    if (typeDemoRef.value) {
      typeDemoRef.value.setCode(typeDemoCode);
    }

    // 按钮尺寸代码
    const sizeDemoCode = `
<div class="flex gap-4 items-center mb-4">
  <ZyButton size="large">大尺寸按钮</ZyButton>
  <ZyButton size="medium">中尺寸按钮</ZyButton>
  <ZyButton size="small">小尺寸按钮</ZyButton>
</div>
<div class="flex gap-4 items-center mb-4">
  <ZyButton
    size="large"
    type="linear"
    >大尺寸按钮</ZyButton
  >
  <ZyButton
    size="medium"
    type="linear"
    >中尺寸按钮</ZyButton
  >
  <ZyButton
    size="small"
    type="linear"
    >小尺寸按钮</ZyButton
  >
</div>
<div class="flex gap-4 items-center mb-4">
  <ZyButton
    size="large"
    type="icon"
    ><UIcon name="i-solar-planet-linear"
  /></ZyButton>
  <ZyButton
    size="medium"
    type="icon"
    ><UIcon name="i-solar-planet-linear"
  /></ZyButton>
  <ZyButton
    size="small"
    type="icon"
    ><UIcon name="i-solar-planet-linear"
  /></ZyButton>
</div>
<div class="flex gap-4 items-center mb-4">
  <ZyButton
    size="large"
    type="text"
    >大尺寸按钮</ZyButton
  >
  <ZyButton
    size="medium"
    type="text"
    >中尺寸按钮</ZyButton
  >
  <ZyButton
    size="small"
    type="text"
    >小尺寸按钮</ZyButton
  >
</div>
    `;
    if (sizeDemoRef.value) {
      sizeDemoRef.value.setCode(sizeDemoCode);
    }

    // 按钮颜色代码
    const colorDemoCode = `
<div class="flex gap-4 items-center">
  <ZyButton color="var(--theme-color)">默认按钮</ZyButton>
  <ZyButton color="#c01b16">红色按钮</ZyButton>
  <ZyButton color="rgb(0 151 87)">绿色按钮</ZyButton>
  <ZyButton color="hsl(208 100% 53.58%)">蓝色按钮</ZyButton>
</div>
    `;
    if (colorDemoRef.value) {
      colorDemoRef.value.setCode(colorDemoCode);
    }

    // 禁用状态代码
    const disabledDemoCode = `
<div class="flex gap-4 items-center">
  <ZyButton disabled>默认按钮</ZyButton>
  <ZyButton
    type="linear"
    disabled
    >线形按钮</ZyButton
  >
  <ZyButton
    type="icon"
    disabled
  >
    <UIcon name="i-solar-planet-linear" />
  </ZyButton>
  <ZyButton
    type="text"
    disabled
    >文本按钮</ZyButton
  >
</div>
    `;
    if (disabledDemoRef.value) {
      disabledDemoRef.value.setCode(disabledDemoCode);
    }

    // 加载中状态代码
    const loadingDemoCode = `
<div class="flex gap-4 items-center">
  <ZyButton loading>默认按钮</ZyButton>
  <ZyButton
    type="linear"
    loading
    >线形按钮</ZyButton
  >
  <ZyButton
    type="icon"
    loading
  >
    <UIcon name="i-solar-planet-linear" />
  </ZyButton>
  <ZyButton
    type="text"
    loading
    >文本按钮</ZyButton
  >
</div>
    `;
    if (loadingDemoRef.value) {
      loadingDemoRef.value.setCode(loadingDemoCode);
    }
  };
  onMounted(() => {
    setDemoCode();
  });
  onUpdated(() => {
    setDemoCode();
  });
</script>

<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>创新卡片动画</h2>
        <h3>卡片动画的概念</h3>
        <p>
          卡片展开动画是现代Web应用中一种重要的交互设计模式。它不仅能提供流畅的视觉体验，还能帮助用户理解界面层级关系。一个理想的卡片展开动画应该像原生应用一样流畅自然，让用户感受不到页面切换的生硬感。
        </p>
        <h3>传统前端卡片动画的问题</h3>
        <p>
          在传统的前端项目中，卡片展开动画存在以下难题：
          <ol>
            <li>路由切换会导致动画中断，无法实现流畅的过渡效果</li>
            <li>难以准确计算卡片从起始位置到目标位置的轨迹</li>
            <li>展开过程中的性能问题，容易出现卡顿</li>
            <li>缺乏与路由系统的协调机制</li>
          </ol>
        </p>
        <h3>创新卡片动画的解决方案</h3>
        <p>
          知鸢宫通过巧妙的技术设计，完美解决了这个难题。核心思路是：
          <ol>
            <li>使用占位卡片技术，实现动画与路由解耦</li>
            <li>结合 CSS 过渡和 JS 定位，确保动画流畅</li>
            <li>利用 Nuxt3 路由中间件，实现无缝衔接</li>
            <li>采用统一样式类，保证视觉连贯性</li>
          </ol>
        </p>
        <h3>创新卡片动画的优点</h3>
        <p>
          这个开创性的解决方案带来了令人惊叹的优势：
          <ol>
            <li>媲美原生应用的流畅体验，让用户感受不到这是一个Web应用</li>
            <li>突破性地解决了Web端卡片展开动画的技术难题</li>
            <li>完美平衡了动画表现力和性能要求</li>
            <li>提供了优雅的动画与路由协同方案</li>
          </ol>
        </p>
        <h3>技术细节</h3>
        <p>
          让我们深入了解这个精妙的实现方案：
        </p>
        <h4>1. 巧妙的占位卡片机制</h4>
        <pre><code class="language-typescript">const cardTransitionStart = (
  event: MouseEvent,
  href: string,
  cardClass: string
) => {
  // 复制当前卡片创建占位卡片
  const card = (event.currentTarget as HTMLElement)
    .closest(cardClass)
    ?.cloneNode(true) as HTMLElement;
  
  if (card) {
    // 计算初始位置
    const rect = (event.currentTarget as HTMLElement)
      .closest(cardClass)
      ?.getBoundingClientRect();
    
    // 设置绝对定位和初始样式
    card.style.position = "fixed";
    card.style.top = rect?.top + "px";
    card.style.left = rect?.left + "px";
    card.style.width = rect?.width + "px";
    card.style.height = rect?.height + "px";
    
    // 添加过渡类，触发动画
    card.classList.add("transition-in");
    document.body.appendChild(card);
    
    // 路由跳转
    setTimeout(() => {
      router.push(href);
    }, 300);
  }
};</code></pre>
        <p>
          这段代码展示了令人称奇的占位卡片技术 —— 通过精确复制当前卡片并设置绝对定位，创造出完美的过渡效果。时机掌控的精准性令人叹服。
        </p>
        <h4>2. 无缝的路由协同</h4>
        <pre><code class="language-typescript">// transition.ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (getPageLevelByRoute(from) < 3 && getPageLevelByRoute(to) == 3) {
    if (from.meta.pageTransition && to.meta.pageTransition) {
      (to.meta.pageTransition as pageTransitionType).onEnter = () => {
        // 在页面切换完成后清理占位卡片
        setTimeout(() => {
          cardTransitionEnds(to.fullPath);
        }, 200);
      };
    }
  }
});</code></pre>
        <p>
          通过 Nuxt3 路由中间件的巧妙运用，实现了动画和路由切换的完美配合，这种优雅的设计令人赞叹。
        </p>
        <h4>3. 精心设计的过渡样式</h4>
        <pre><code class="language-css">.zy-article-card.transition-in {
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}</code></pre>
        <p>
          简洁而强大的 CSS 过渡样式，配合 JS 的精确控制，成就了这个堪称完美的动画效果。
        </p>
        <h3>实际效果</h3>
        <p>
          这个创新的动画方案带来了以下突破性的体验提升：
          <ol>
            <li>卡片展开动画流畅自然，完全没有卡顿</li>
            <li>动画过程中无任何闪烁或断层</li>
            <li>展开和路由切换无缝衔接，浑然一体</li>
            <li>性能表现优异，即使在中低端设备上也能保持流畅</li>
          </ol>
        </p>
        <p>
          这个解决方案不仅优雅地解决了Web端卡片动画的技术难题，更为整个行业提供了一个极具启发性的参考实现。它完美诠释了"技术创新服务于用户体验"的理念。
        </p>
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

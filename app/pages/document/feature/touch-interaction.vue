<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>统一触摸交互</h2>
        <h3>触摸交互的概念</h3>
        <p>
          触摸交互是现代Web应用中不可或缺的一部分。它不仅包括移动设备上的触摸操作，还包括PC端的鼠标交互。一个优秀的触摸交互系统应该能够在不同设备上提供一致的用户体验。
        </p>
        <h3>传统前端触摸交互的问题</h3>
        <p>
          在传统的前端项目中，触摸交互存在以下问题：
          <ol>
            <li>PC端和移动端的事件处理逻辑不统一</li>
            <li>缺乏对滑动距离的精确控制</li>
            <li>滑动状态管理复杂</li>
            <li>交互体验在不同设备上不一致</li>
          </ol>
        </p>
        <h3>统一触摸交互的解决方案</h3>
        <p>
          知鸢宫通过 <code>ZyTouch</code> 组件实现了统一的触摸交互解决方案。该组件：
          <ol>
            <li>统一处理PC端和移动端的滑动事件</li>
            <li>实现精确的滑动距离判定</li>
            <li>提供完整的滑动状态管理</li>
            <li>支持多方向滑动判定</li>
          </ol>
        </p>
        <h3>统一触摸交互的优点</h3>
        <p>
          统一触摸交互的优点主要有：
          <ol>
            <li>提供一致的用户体验</li>
            <li>简化开发流程</li>
            <li>提高代码复用性</li>
            <li>增强交互的可控性</li>
          </ol>
        </p>
        <h3>技术细节</h3>
        <p>
          <code>ZyTouch</code> 组件通过以下技术实现统一的触摸交互：
        </p>
        <h4>1. 事件统一处理</h4>
        <pre><code class="language-html">{{
`<div
  ref="touchEvent"
  @mousedown.prevent="onMouseDown"
  @mousemove.prevent="onMouseMove"
  @mouseup.prevent="onMouseUp"
  @touchstart.passive="onTouchStart"
  @touchmove.passive="onTouchMove"
  @touchend.passive="onTouchEnd"
>
  <slot />
</div>`
        }}</code></pre>
        <p>
          组件同时监听鼠标事件和触摸事件，通过统一的状态管理实现一致的交互体验。
        </p>
        <h4>2. 精确的距离计算</h4>
        <pre><code class="language-typescript">{{
`const startTranslate = (moveDistanceX: number, moveDistanceY: number) => {
  if (Math.abs(moveDistanceX) > 10 || Math.abs(moveDistanceY) > 10) {
    if (!crossBorder()) {
      if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
        if (moveDistanceX > 0) {
          emit("slidingLeft", { moveDistanceX });
        } else {
          emit("slidingRight", { moveDistanceX });
        }
      } else {
        if (moveDistanceY > 0) {
          emit("slidingUp", { moveDistanceY });
        } else {
          emit("slidingDown", { moveDistanceY });
        }
      }
    }
  }
};`
        }}</code></pre>
        <p>
          通过计算起始点和终点的距离，结合方向判定，实现精确的滑动控制。
        </p>
        <h4>3. 完整的状态管理</h4>
        <pre><code class="language-typescript">{{
`const stopTranslate = (moveDistanceX: number, moveDistanceY: number) => {
  if (Math.abs(moveDistanceX) > 10 || Math.abs(moveDistanceY) > 10) {
    if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
      if (moveDistanceX > 0) {
        if (moveDistanceX > viewWidth / 6) {
          emit("slideEndLeft", { moveDistanceX });
        } else {
          emit("slideCancelLeft", { moveDistanceX });
        }
      }
    }
  }
};`
        }}</code></pre>
        <p>
          提供了滑动进行中(<code>sliding</code>)、滑动成功(<code>slideEnd</code>)、滑动取消(<code>slideCancel</code>)三种状态的事件。
        </p>
        <h4>4. 边界处理</h4>
        <pre><code class="language-typescript">{{
`const crossBorder = () => {
  if (endX < viewLeft + 5 || endX > viewLeft + viewWidth - 5) {
    return true;
  } else if (endY < viewTop + 5 || endY > viewTop + viewHeight - 5) {
    return true;
  } else {
    return false;
  }
};`
        }}</code></pre>
        <p>
          通过边界检测确保交互在有效区域内进行，提高用户体验。
        </p>
        <h3>使用示例</h3>
        <p>
          在抽屉面板等需要滑动交互的组件中，可以这样使用：
        </p>
        <pre><code class="language-html">{{
`<ZyTouch
  :init="initValue"
  @sliding-left="onSliding"
  @slide-end-left="onSlideEnd"
  @slide-cancel-left="onSlideCancel"
>
  <div class="drawer-panel">
    <!-- 抽屉面板内容 -->
  </div>
</ZyTouch>`
        }}</code></pre>
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

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
  </Html>
  <ZySuperResponsive>
    <NuxtLayout>
      <NuxtPage mx-auto class="nuxt-page" />
    </NuxtLayout>
  </ZySuperResponsive>
</template>
<script setup lang="ts">
import "@/assets/css/style.scss";
import "@/assets/css/common-to-live2d.scss";
import "@/transition/transition.scss";
import "@/assets/css/common-to-nprogress.scss";
import "@/assets/css/common-to-markdown.scss"

// 多语言
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

// Live2D
const myLive2dConfig = () => {
  const OML2D = (window as any).OML2D;
  if (!OML2D) {
    setTimeout(() => {
      myLive2dConfig();
    }, 200);
  } else {
    OML2D.loadOhMyLive2D({
      sayHello: false,
      mobileShow: true,
      transitionTime: 600,
      source: "https://pan.yiru.love/project-zhiyuanpalace/live2d/",
      models: {
        path: "/草神/草神.model3.json",
        scale: 0.8,
      },

      tips: {
        idleTips: {
          message: [
            "我可以用我的知识，换取你路上的见闻吗？",
            "不知道干什么的话，要不要我带你去转转呀？",
            "又有心事吗？我来陪你一起想吧~",
            "果然要亲眼去看，才能感受到世界的美~",
            "你冒险经验这么丰富，当我的向导好不好啊？",
            "这个问题的答案，聪明的你能够明白吗？",
            "我以智慧之神的名义为你赐福，从今往后不再会有困惑阻碍你的旅途",
            "思路变得更开阔了，天空和大海都能装进去~",
          ],
        },
        welcomeTips: {
          message: {
            daybreak:
              "早上好，我们赶快出发吧，这世上有太多的东西都是「过时不候」的呢~",
            morning: "上午好！没去过的地方还有很多呢，记得要多起来走动走动呀~",
            noon: "午休时间到，我想喝树莓薄荷饮。用两个和太阳有关的故事和你换，好不好？",
            afternoon: "午后很容易犯困呢，来吃一颗枣椰蜜糖吧~",
            dusk: "太阳落山啦，我们也该把舞台让给夜行的大家族了~",
            night: "晚上好，今天过得怎么样呢？来我家做客吧~",
            lateNight: "已经这么晚了呀，早点休息吧，晚安~",
            weeHours: "快去睡吧，放心，我已经为你准备好甜甜的梦啦~",
          },
        },
      },
      // ...more
    });
  }
};
// if (process.client) {
//   const script = document.createElement("script");
//   script.src = "/static/js/oh-my-live2d.min.js";
//   document.body.appendChild(script);
//   myLive2dConfig();
// }

// head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 知鸢宫` : "知鸢宫";
  },
});
</script>
<style lang="scss">
.nuxt-page {
  min-height: 100vh;
  padding-bottom: 10rem;
  will-change: transform;
}
.page-article-details .nuxt-page {
  padding-bottom: 0;
}
:root {
  background: #eaecf1;
  color: var(--text-1);
}

:root.dark {
  background: #0d0d26;
}

.vertical-layout {
  display: none;
}
.horizontal-layout {
  display: none;
}

@media (orientation: landscape) {
  /* 横屏 */
  .horizontal-layout {
    display: block;
  }
}
@media (orientation: portrait) {
  :root {
    background: #f7f8fa;
    --bg-header-bar: rgba(255, 255, 255, 0.9); //顶栏
    --bg-card: rgba(255, 255, 255, 0.7); //卡片
  }
  /* 竖屏 */
  .vertical-layout {
    display: block;
  }
}
@media (pointer: fine) {
  /* 使用鼠标或手写笔 */
}
@media (pointer: coarse) {
  /* 使用触摸屏 */
}
@media (hover: hover) {
  /* 可以hover */
}
@media (hover: none) {
  /* 不可以hover */
}
</style>

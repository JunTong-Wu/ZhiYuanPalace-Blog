<template>
  <Head>
    <Title>知鸢宫</Title>
  </Head>
  <ZySuperResponsive>
    <NuxtLayout>
      <div
        text-base
        overflow-auto
        scroll-view
        will-change-transform
        class="main-view transition-in"
        p-4
      >
        <NuxtPage mx-auto />
      </div>
    </NuxtLayout>
  </ZySuperResponsive>
</template>
<script setup lang="ts">
import "@/src/assets/css/style.scss";
import "@/src/assets/css/common-to-live2d.scss";

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
      transitionTime: 400,
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

if (process.client) {
  const script = document.createElement("script");
  script.src = "/static/js/oh-my-live2d.min.js";
  document.body.appendChild(script);
  myLive2dConfig();
}

// 过渡
const router = useRouter();
const check_loading = () => {
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(timer);
      document.querySelector(".main-view")?.classList.add("transition-in");
    }
  }, 100);
};
onMounted(() => {
  router.beforeEach((to, from, next) => {
    document.querySelector(".main-view")?.classList.remove("transition-in");
    document.querySelector(".main-view")?.classList.add("transition-out");
    setTimeout(() => {
      document.querySelector(".main-view")?.classList.remove("transition-out");
      setTimeout(() => {
        next();
        check_loading();
      }, 200);
    }, 200);
  });
});

// head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 知鸢宫` : "知鸢宫";
  },
});
</script>
<style lang="scss" scoped>
.main-view {
  transform: translateY(100px);
  opacity: 0;
}
.main-view.transition-in {
  transform: translateY(0px);
  opacity: 1;
  transition: all 400ms;
}
.main-view.transition-out {
  transform: translateY(0px);
  opacity: 0;
  transition: opacity 200ms;
}
</style>

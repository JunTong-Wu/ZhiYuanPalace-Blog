<template>
  <Head>
    <Title>知鸢宫</Title>
  </Head>
  <Loading :display="loading"/>
  <ZySuperResponsive

    :base-font-size="baseFontSize"
    :break-points="breakPoints"
    :design-size="designSize"
    @touchstart="initTouchStart($event)"
    @touchmove="preventTouchGesture($event)"
  >
    <NuxtLayout></NuxtLayout>
  </ZySuperResponsive>
</template>
<script setup lang="ts">
import Loading from "./src/design/components/common/ZyLoading/loading.vue";
import "@/src/assets/css/style.scss";

const baseFontSize = 18;
const breakPoints = {
  xs: 600,
  sm: 900,
  md: 1200,
  lg: 1500,
  xl: 1800,
};
const designSize = {
  min_xs_v: 375, //手机竖屏
  min_xs_h: 812, //手机横屏
  xs_sm_v: 576, //小平板竖屏
  xs_sm_h: 1024, //小平板横屏
  sm_md_v: 720, //大平板竖屏
  sm_md_h: 1280, //大平板横屏
  md_lg_v: 768, //小笔记本竖屏
  md_lg_h: 1366, //小笔记本横屏
  lg_xl_v: 900, //大笔记本竖屏
  lg_xl_h: 1600, //大笔记本横屏
  xl_max_v: 1080, //显示器竖屏
  xl_max_h: 1920, //显示器横屏
};

const { locale } = useI18n();
const pathList = ref([
  `/${locale.value}`,
  `/${locale.value}/article`,
  `/${locale.value}/shuoshuo`,
  `/${locale.value}/photo`,
  `/${locale.value}/video`,
]);

watch(
  () => locale.value,
  (newValue) => {
    pathList.value.splice(0, pathList.value.length);
    pathList.value.push(`/${newValue}`);
    pathList.value.push(`/${newValue}/article`);
    pathList.value.push(`/${newValue}/shuoshuo`);
    pathList.value.push(`/${newValue}/photo`);
    pathList.value.push(`/${newValue}/video`);
    // console.log(pathList.value);
  }
);

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
  // const script = document.createElement("script");
  // script.src = "/static/js/oh-my-live2d.min.js";
  // document.body.appendChild(script);
  // myLive2dConfig();
}

// 阻止vivo浏览器手势
function findAncestor(element: HTMLElement | null, ancestorSelector: string) {
  if (!element || element.tagName.toLowerCase() === "html") {
    return null;
  }
  if (element.matches(ancestorSelector)) {
    return element;
  }
  return findAncestor(element.parentElement, ancestorSelector);
}

var startX: number, startY: number;
const initTouchStart = (e: TouchEvent) => {
  startX = e.targetTouches[0].pageX;
  startY = e.targetTouches[0].pageY;
};
const preventTouchGesture = (e: TouchEvent) => {
  const ancestorElement = findAncestor(e.target as any, "[scroll-view]");
  if (!ancestorElement) {
    e.cancelable && e.preventDefault();
  } else {
    var moveX = e.targetTouches[0].pageX;
    var moveY = e.targetTouches[0].pageY;
    if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
      e.cancelable && e.preventDefault();
    }
  }
};

// loading
const loading = ref(false)
const check_loading = () => {
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(timer);
      loading.value = false
    }
  }, 300);
}
const router = useRouter();
onMounted(() => {
  router.beforeEach((to, from, next) => {
    loading.value = true
    setTimeout(() => {
      check_loading()
      next()
    }, 500);
  });
});

// head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 知鸢宫` : '知鸢宫';
  }
})
</script>
<style lang="scss">
body{
  background: var(--bg-1);
  color: var(--text-1);
  overflow: hidden;
}
</style>
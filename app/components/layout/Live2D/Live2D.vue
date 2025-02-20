<template></template>
<script setup lang="ts">
  import { live2dHide, live2dShow } from './transition';
  import './transition.scss';
  const props = defineProps({
    hide: {
      type: Boolean,
      required: false,
    },
  });
  // Live2D
  const myLive2dConfig = () => {
    const OML2D = (window as any).OML2D;
    if (!OML2D) {
      setTimeout(() => {
        myLive2dConfig();
      }, 200);
    } else {
      const config = useRuntimeConfig();
      const cdnUrl = config.public.CDN_URL;
      OML2D.loadOhMyLive2D({
        sayHello: false,
        mobileShow: true,
        transitionTime: 600,
        source: `${cdnUrl}/live2d/`,
        models: {
          path: '/草神/草神.model3.json',
          scale: 0.8,
        },

        tips: {
          idleTips: {
            message: [
              '我可以用我的知识，换取你路上的见闻吗？',
              '不知道干什么的话，要不要我带你去转转呀？',
              '又有心事吗？我来陪你一起想吧~',
              '果然要亲眼去看，才能感受到世界的美~',
              '你冒险经验这么丰富，当我的向导好不好啊？',
              '这个问题的答案，聪明的你能够明白吗？',
              '我以智慧之神的名义为你赐福，从今往后不再会有困惑阻碍你的旅途',
              '思路变得更开阔了，天空和大海都能装进去~',
            ],
          },
          welcomeTips: {
            message: {
              daybreak:
                '早上好，我们赶快出发吧，这世上有太多的东西都是「过时不候」的呢~',
              morning:
                '上午好！没去过的地方还有很多呢，记得要多起来走动走动呀~',
              noon: '午休时间到，我想喝树莓薄荷饮。用两个和太阳有关的故事和你换，好不好？',
              afternoon: '午后很容易犯困呢，来吃一颗枣椰蜜糖吧~',
              dusk: '太阳落山啦，我们也该把舞台让给夜行的大家族了~',
              night: '晚上好，今天过得怎么样呢？来我家做客吧~',
              lateNight: '已经这么晚了呀，早点休息吧，晚安~',
              weeHours: '快去睡吧，放心，我已经为你准备好甜甜的梦啦~',
            },
          },
        },
        // ...more
      });
      if (props.hide) {
        live2dHide();
      }
    }
  };

  const initLive2d = () => {
    const script = document.createElement('script');
    script.src = '/static/js/oh-my-live2d.min.js';
    document.body.appendChild(script);
    myLive2dConfig();
  };

  onMounted(() => {
    const canvas = document.querySelector('#oml-canvas');
    if (!canvas) {
      initLive2d();
    }
  });

  watch(
    () => props.hide,
    (newValue) => {
      if (newValue) {
        live2dHide();
      } else {
        live2dShow();
      }
    },
    { immediate: true },
  );
</script>
<style lang="scss">
  #oml-stage {
    left: -3.5% !important;
    right: auto;
    bottom: -2% !important;
    z-index: 60 !important;
  }

  #oml-controls,
  #oml-levitated-btn {
    display: none !important;
  }

  #oml-tips {
    font-size: 0.75rem !important;
    line-height: 1.5;
    width: auto !important;
    min-width: 12rem;
    height: auto !important;
    top: 2.5% !important;
    background-color: var(--bg-level-2) !important;
    backdrop-filter: blur(30px);
    color: var(--text-1) !important;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.1) !important;
    filter: none !important;
    border: 1px solid var(--border-color) !important;
    padding: 0.5rem !important;
  }

  /* 手机布局 */
  :root.mobile {
    #oml-stage,
    #oml-tips {
      visibility: hidden !important;
    }
  }

  @media (orientation: portrait) {
    #oml-stage,
    #oml-tips {
      visibility: hidden !important;
    }
  }

  /* 最小宽度 */
  @media (max-width: 1000px) {
    #oml-stage,
    #oml-tips {
      visibility: hidden !important;
    }
  }

  /* 最小高度 */
  @media (max-height: 700px) {
    #oml-stage,
    #oml-tips {
      visibility: hidden !important;
    }
  }
</style>

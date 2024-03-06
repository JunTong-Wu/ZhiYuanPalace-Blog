<template>
  <a
    class="zy-article-card"
    w-full
    h-full
    inline-block
    overflow-hidden
    cursor-pointer
    color-text-1
    @click.prevent="openCard($el)"
  >
    <div class="zy-article-card-inner">
      <div class="zy-card-title">
        <slot name="title" />
      </div>
      <div class="zy-card-image">
        <slot name="image" />
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { cardTransitionStart } from "@/transition/articleCard/articleCard";
export default {
  props: {
    skeleton: { type: Boolean, default: false }, // 指定是否是骨架屏
  },
  setup(props) {
    const router = useRouter();
    const openCard = (element: any) => {
      if (!props.skeleton) {
        if (element) {
          let href = element.href;
          let url = new URL(href);
          let path = url.pathname;
          cardTransitionStart(element, () => {
            router.replace(path);
          });
        }
      }
    };
    return {
      openCard,
    };
  },
};
</script>

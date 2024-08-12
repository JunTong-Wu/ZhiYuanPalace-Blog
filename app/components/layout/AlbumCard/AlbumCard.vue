<template>
  <div class="zy-album-card">
    <a
      class="w-full h-full inline-block overflow-hidden cursor-pointer color-text-1"
      :href="href"
      @click.prevent="openCard($el)"
    >
      <div class="zy-album-card-inner">
        <div class="zy-card-title dark">
          <slot name="title" />
        </div>
        <div class="zy-card-image">
          <slot name="image" />
        </div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { cardTransitionStart } from "./AlbumCard";
export default {
  props: {
    skeleton: { type: Boolean, default: false }, // 指定是否是骨架屏
    href: { type: String, default: "" }, // 点击跳转的链接
  },
  setup(props) {
    const router = useRouter();
    const openCard = (element: any) => {
      if (!props.skeleton) {
        if (element) {
          let href = props.href;
          cardTransitionStart(element, () => {
            router.push(href);
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

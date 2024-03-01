<template>
  <a
    class="zy-article-card"
    w-full
    h-full
    inline-block
    overflow-hidden
    cursor-pointer
    color-text-1
    col-span-12
    xs:col-span-6
    sm:col-span-4
    md:col-span-3
    lg:col-span-3
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
<script setup lang="ts">
import { cardTransitionStart } from "@/transition/articleCard/articleCard";

const router = useRouter();
const openCard = (element: any) => {
  if (element) {
    let href = element.href;
    let url = new URL(href);
    let path = url.pathname;
    cardTransitionStart(element, () => {
      router.replace(path);
    });
  }
};
</script>

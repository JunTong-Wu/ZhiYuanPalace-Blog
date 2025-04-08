<template>
  <NuxtLink
    :to="to"
    class="zy-link bg-transparent text-sm border-0 text-text-1 inline-flex items-center no-underline px-1"
    :class="{
      outside: type == 'outside',
    }"
    @click.prevent="swichRouter(to)"
    :title="title"
  >
    <slot />
  </NuxtLink>
</template>
<script lang="ts" setup>
  import { useRouter } from "vue-router";

  // 定义类型
  type Type = "replace" | "push" | "outside";

  // 定义 props
  const props = defineProps({
    to: {
      type: String,
      default: "",
    },
    title: { type: String, default: "" },
    type: {
      type: String as () => Type,
      default: "push",
      validator: (value: string) =>
        ["replace", "push", "outside"].includes(value),
    },
  });

  // 获取路由实例
  const router = useRouter();

  // 定义切换路由的函数
  const swichRouter = (url: string) => {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = "auto";
    }
    if (props.type === "replace") {
      router.replace(url);
    } else if (props.type === "push") {
      router.push(url);
    } else if (props.type === "outside") {
      window.open(url);
    }
  };
</script>
<style lang="scss" scoped>
  @media (hover: hover) {
    //.zy-link {
    //  border-top: 2px solid transparent;
    //  border-bottom: 2px solid transparent;
    //  transition: all 0.2s ease-in-out;
    //  &:hover {
    //    border-bottom: 2px solid var(--theme-color-500);
    //  }
    //}
  }
</style>

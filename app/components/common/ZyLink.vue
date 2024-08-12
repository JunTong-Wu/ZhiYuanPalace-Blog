<template>
  <NuxtLink
    :to="to"
    class="bg-transparent text-base border-0 text-text-1 flex items-center no-underline"
    @click.prevent="swichRouter(to)"
    :title="title"
  >
    <slot />
  </NuxtLink>
</template>
to
<script lang="ts">
export default defineComponent({
  name: "ZyLink",
  props: {
    to: {
      type: String,
      default: "",
    },
    title: { type: String, default: "" },
    type: { type: String, default: "replace" },
  },
  setup(props) {
    const router = useRouter();
    const swichRouter = (url: string) => {
      const body = document.documentElement;
      if (body) {
        body.style.overflow = "auto";
      }
      if (props.type == "replace") {
        router.replace(url);
      } else if (props.type == "push") {
        router.push(url);
      }
    };
    return {
      props,
      swichRouter,
    };
  },
});
</script>
<style lang="scss" scoped>
@media (hover: hover) {
  button {
    cursor: pointer;
  }
}
</style>

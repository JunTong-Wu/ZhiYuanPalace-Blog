<template>
  <a
    :href="to"
    bg-transparent
    text-base
    border-0
    color-text-1
    @click.prevent="swichRouter(to)"
    flex
    items-center
    no-underline
    :title="title"
  >
    <slot />
  </a>
</template>
to
<script lang="ts">
export default defineComponent({
  name: "zy-link",
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

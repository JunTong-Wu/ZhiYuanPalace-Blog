<template>
  <NuxtLink
    :to="to"
    class="zy-link bg-transparent text-base border-0 text-text-1 inline-flex items-center no-underline px-1"
    :class="{
      outside: type == 'outside',
    }"
    @click.prevent="swichRouter(to)"
    :title="title"
  >
    <slot />
    <UIcon
      v-if="type == 'outside'"
      name="i-solar-arrow-right-up-linear"
      class="w-4 h-4 ml-1"
    />
  </NuxtLink>
</template>
<script lang="ts">
  type Type = "replace" | "push" | "outside";
  export default defineComponent({
    name: "ZyLink",
    props: {
      to: {
        type: String,
        default: "",
      },
      title: { type: String, default: "" },
      type: {
        type: String as () => Type,
        default: "replace",
        validator: (value: string) =>
          ["replace", "push", "outside"].includes(value),
      },
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
        } else if (props.type == "outside") {
          window.open(url);
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

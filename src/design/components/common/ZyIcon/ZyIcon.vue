<template>
  <div
    overflow-hidden
    relative
    :style="{ width: size, height: size }"
    class="zy-icon"
    :class="{ filled: filled }"
  >
    <!-- <inline-svg :src="path" /> -->

    <p>{{ getSvgIconUrl(name) }}</p>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-icon",
  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "1rem",
    },
    color: {
      type: String,
      default: "inherit",
    },
    filled: {
      type: Boolean,
      default: false,
    },
    filledColor: {
      type: String,
      default: "inherit",
    },
  },
  setup(props) {
    const path = ref("");
    const getSvgIconUrl = (name: string) => {
      // const url = `/static/svg/icon/fluent/${name}.svg`;
      // return url;
      console.log(name);

      // import(`@sicons/fluent/${name}Filled.svg`).then((res) => {
      //   console.log(res.default);
      //   path.value = res.default;
      // });
      const url = new URL(`./assets/image/logo-text.svg`, import.meta.url);
      console.log(url);
      return url;
    };
    getSvgIconUrl(props.name);
    return {
      props,
      getSvgIconUrl,
      path,
    };
  },
});
</script>
<style lang="scss" scoped>
.zy-icon {
  > img:first-of-type {
    opacity: 1;
  }
  > img:nth-of-type(2) {
    opacity: 0;
  }
  &.filled {
    > img:first-of-type {
      opacity: 0;
    }
    > img:nth-of-type(2) {
      opacity: 1;
    }
  }
}
</style>

<template>
  <ul v-if="loading || localLoading" :class="rowClass">
    <li v-for="i in minLoadingNumber" :key="`loading-${i}`" :class="cloClass">
      <slot name="loading"></slot>
    </li>
  </ul>
  <ul v-else :class="rowClass">
    <template v-for="(i, index) in item?.data" :key="`success-${i}`">
      <template v-if="localMaxDataLength > 0">
        <li v-if="index < localMaxDataLength" :class="cloClass">
          <slot :row="i" name="onload"></slot>
        </li>
      </template>
      <li v-else :class="cloClass">
        <slot :row="i" name="onload"></slot>
      </li>
    </template>
    <slot :row="item.data" name="onload_noForeach"></slot>
  </ul>
</template>
<script lang="ts">
export default {
  name: "ZyFetchLoading",
  props: {
    fetchData: {
      default: {
        data: ref({
          data: [],
          code: 0,
        }),
        pending: ref(false),
        error: ref(null),
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rowClass: {
      type: String,
      default: "",
    },
    cloClass: {
      type: String,
      default: "",
    },
    minLoadingNumber: {
      type: Number,
      default: 1,
    },
    maxDataLength: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const item = ref();
    const localMaxDataLength = ref(0);
    const localLoading = ref(true);

    // 初始化 item 和 localMaxDataLength
    item.value = {
      data: [],
      code: 0,
    };
    if (props.maxDataLength > 0) {
      localMaxDataLength.value = props.maxDataLength;
    }

    // 服务端获取参数
    if (
      props.fetchData.data &&
      props.fetchData.data.value &&
      props.fetchData.data.value.code === 0
    ) {
      item.value = props.fetchData.data.value;
      localLoading.value = false;
    }

    // 客户端获取参数
    watchEffect(() => {
      if (
        props.fetchData.data &&
        props.fetchData.data.value &&
        props.fetchData.data.value.code === 0
      ) {
        item.value = props.fetchData.data.value;
        localLoading.value = false;
      }
    });

    return {
      item,
      localMaxDataLength,
      localLoading,
    };
  },
};
</script>

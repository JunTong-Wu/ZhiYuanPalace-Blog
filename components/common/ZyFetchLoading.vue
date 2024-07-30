<template>
  <div
    v-if="
      fetchData.pending.value ||
      fetchData.error.value ||
      fetchData.res.value?.code !== 0
    "
    :class="rowClass"
  >
    <div v-for="i in minLoadingNumber" :key="`loading-${i}`" :class="cloClass">
      <slot name="loading"></slot>
    </div>
  </div>
  <div v-else :class="rowClass">
    <div v-for="i in item?.data" :key="`success-${i}`" :class="cloClass">
      <slot name="onload" :row="i"></slot>
    </div>
    <slot name="onload_noForeach" :row="item.data"></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: "ZyFetchLoading",
  props: {
    fetchData: {
      default: {
        res: ref(),
        pending: ref(),
        error: ref(),
        refresh: ref(),
      },
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
  },
  setup(props) {
    const item = ref();

    // 初始化
    item.value = {
      data: [],
      code: 0,
    };

    // 服务端获取参数
    if (props.fetchData.res.value && props.fetchData.res.value.code === 0) {
      item.value = props.fetchData.res.value;
    }

    // 客户端获取参数
    watch(props.fetchData.pending, (newValue: any) => {
      if (!newValue) {
        if (
          props.fetchData.res.value &&
          props.fetchData.res.value.code === 0
        ) {
          item.value = props.fetchData.res.value;
        }
      }
    });

    // 弹框提醒
    if (process.client) {
      watch(
        props.fetchData.error,
        (newValue: any) => {
          if (newValue) {
            // showErrorMsg("408", "服务端响应超时");
          }
        },
        { immediate: true }
      );
      watch(
        props.fetchData.res,
        (newValue: { code: number }) => {
          if (newValue && newValue.code !== 0) {
            // showErrorMsg(newValue.code, newValue.message);
          }
        },
        { immediate: true }
      );
    }

    return {
      item,
    };
  },
};
</script>

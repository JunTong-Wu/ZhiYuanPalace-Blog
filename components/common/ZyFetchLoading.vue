<template>
  <ul
    v-if="
      fetchData.pending.value ||
      fetchData.error.value ||
      fetchData.res.value?.code !== 0
    "
    :class="rowClass"
  >
    <li v-for="i in minLoadingNumber" :key="`loading-${i}`" :class="cloClass">
      <slot name="loading"></slot>
    </li>
  </ul>
  <ul v-else :class="rowClass">
    <template v-for="(i,index) in item?.data" :key="`success-${i}`">
      <template v-if="localMaxDataLength > 0">
        <li v-if="index < localMaxDataLength" :class="cloClass">
          <slot name="onload" :row="i"></slot>
        </li>
      </template>
      <li v-else :class="cloClass">
        <slot name="onload" :row="i"></slot>
      </li>
    </template>
    <slot name="onload_noForeach" :row="item.data"></slot>
  </ul>
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
    maxDataLength: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const item = ref();
    const localMaxDataLength = ref(0);

    // 初始化
    item.value = {
      data: [],
      code: 0,
    };
    if (props.maxDataLength > 0) {
      localMaxDataLength.value = props.maxDataLength;
    }

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
      localMaxDataLength,
    };
  },
};
</script>

<template>
  <ul
    v-if="loading"
    :class="rowClass"
  >
    <li v-for="i in minLoadingNumber" :key="`loading-${i}`" :class="cloClass">
      <slot name="loading"></slot>
    </li>
  </ul>
  <ul v-else :class="rowClass">
    <template v-for="(i, index) in item?.data" :key="`success-${i}`">
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
        code: 0,
        message: '请求成功',
        data:[],
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

    // 初始化
    item.value = {
      data: [],
      code: 0,
    };
    if (props.maxDataLength > 0) {
      localMaxDataLength.value = props.maxDataLength;
    }

    // 服务端获取参数
    if (props.fetchData.data) {
      if (props.fetchData.data.length > 0) {
        item.value.data = props.fetchData.data;
      }
    }

    return {
      item,
      localMaxDataLength,
    };
  },
};
</script>

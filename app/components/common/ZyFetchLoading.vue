<template>
  <div v-if="loading || (localLoading && fetchData)">
    <slot name="loading"></slot>
  </div>
  <div v-else>
    <slot name="onload"></slot>
  </div>
</template>
<script setup lang="ts">
  import { ref, watchEffect } from "vue";

  // 定义一个泛型类型来表示 fetchData 的类型
  type FetchDataType<T> = LazyAsyncDataRef<ResOptionsModelType<T>>;

  const props = defineProps<{
    fetchData?: FetchDataType<any> | undefined;
    loading?: boolean;
  }>();

  const emit = defineEmits(["fetchOnload"]);

  const result = ref<ResOptionsModelType<any>>({
    data: undefined,
    code: 0,
    message: "",
  });

  const localLoading = ref(true);

  // 服务端获取参数
  if (
    props.fetchData &&
    props.fetchData.data &&
    props.fetchData.data.value &&
    props.fetchData.data.value.code === 0
  ) {
    result.value = props.fetchData.data.value;
    localLoading.value = false;
  }

  // 客户端获取参数
  watchEffect(() => {
    if (
      props.fetchData &&
      !props.fetchData.pending.value &&
      props.fetchData.data &&
      props.fetchData.data.value &&
      props.fetchData.data.value.code === 0
    ) {
      // console.log('客户端获取参数', props.fetchData.data.value.data);
      result.value = props.fetchData.data.value;
      localLoading.value = false;
      emit("fetchOnload", result.value);
    }
  });
</script>

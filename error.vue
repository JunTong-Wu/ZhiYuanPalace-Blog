<template>
  <ZySuperResponsive>
    <NuxtLayout>
      <div  mt-header>
        <h1>Error {{ error.statusCode }}</h1>
        <p>{{ error }}</p>
      </div>
    </NuxtLayout>
  </ZySuperResponsive>
</template>

<script>
export default {
  name: "TestError",
  props: {
    // 接受错误页面传递的错误信息
    error: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.error);
  },
};
</script>

<template>
  <ZySuperResponsive>
    <NuxtLayout>
      <CommonMainSection>
        <h1>Error {{ error.statusCode }}</h1>
        <p>{{ error }}</p>
      </CommonMainSection>
    </NuxtLayout>
  </ZySuperResponsive>
</template>

<script>
import { cardTransitionEnd as ArticleCardTransitionEnd } from "~/components/layout/ArticleCard/ArticleCard";
import { cardTransitionEnd as ShuoShuoCardTransitionEnd } from "~/components/layout/ShuoShuoCard/ShuoShuoCard";

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
    ArticleCardTransitionEnd();
    ShuoShuoCardTransitionEnd();
    console.log(this.error);
  },
};
</script>

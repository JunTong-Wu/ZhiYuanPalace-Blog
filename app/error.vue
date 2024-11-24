<template>
  <div>
    <ZySuperResponsive>
      <Layout>
        <div class="nuxt-page mx-auto min-h-screen">
          <CommonMainSection>


            <!--            <p>statusCode: {{ error.statusCode }}</p>-->
            <!--            <p>statusMessage: {{ error.statusMessage || "&#45;&#45;" }}</p>-->

            <h1 class="text-center text-3xl font-bold mb-8">Error {{ error.statusCode }}</h1>
            <UCard>
              <template #header>
                <p>message: {{ error.message }}</p>
              </template>
              <div v-html="error.stack"></div>
              <template #footer>
                <p class="text-end">url: {{ error.url }}</p>
              </template>
            </UCard>
          </CommonMainSection>
        </div>
      </Layout>
    </ZySuperResponsive>
  </div>
</template>

<script>
import { cardTransitionEnd as ArticleCardTransitionEnd } from "~/components/layout/ArticleCard/transition";
import { cardTransitionEnd as ShuoShuoCardTransitionEnd } from "~/components/layout/ShuoShuoCard/transition";

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
<style>
.stack.internal {
  color: var(--text-1);
  display: block;
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
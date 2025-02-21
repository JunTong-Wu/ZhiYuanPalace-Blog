<template>
  <div class="overflow-hidden">
    <div class="zy-article-card transition-in">
      <ZyFetchLoading
        :fetchData="articleDataLazyFetch"
        @fetchOnload="showArticle"
      >
        <template #loading></template>
        <template #onload>
          <div class="zy-article-card-inner">
            <div class="zy-card-image">
              <ZyImage
                :locked="articleData.has_password"
                :src="`${cdnUrl}${articleData.article_title_image}`"
                alt=""
              />
            </div>
          </div>
          <div
            v-if="!articleData.has_password"
            class="zy-article-card-text pt-8 xs:pt-10 sm:pt-12 md:pt-14 lg:pt-16 px-8 xs:px-10 sm:px-12 md:px-14 lg:px-16"
          >
            <h1
              class="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 mt-0"
            >
              {{ articleData.article_title }}
            </h1>
            <v-md-preview
              v-if="!articleData.has_password"
              class="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-xl pb-40 !leading-10"
              ref="preview"
              :text="articleData.article_text"
            ></v-md-preview>
          </div>
          <div
            v-else
            class="zy-article-card-text"
          >
            <PassWordModel
              type="article"
              :id="articleData.article_id"
              @validate-success="getArticleWithPassword"
            >
            </PassWordModel>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { article } from '@@/models';
  type ArticleModelType = article.Article;

  const { setPostInfo, clearPostInfo } = toRefs(store.usePostInfo());
  const setHeaderTitle = (id: number, title: string) => {
    setPostInfo.value(id, 'article', title);
  };

  const route = useRoute();
  const id = route.params.id as string;

  const getArticleDataLazyFetch = async (password?: string) => {
    if (password) {
      return await ApiArticle.showArticle({
        article_id: id,
        article_password: password,
      });
    }
    return await ApiArticle.showArticle({ article_id: id });
  };

  // 获取文章内容
  const articleData = ref<ArticleModelType>(new article.Article());
  let articleDataLazyFetch = await getArticleDataLazyFetch();

  // 获取加密的文章内容
  const getArticleWithPassword = async (params: { password: string }) => {
    articleDataLazyFetch = await getArticleDataLazyFetch(params.password);
  };

  const showArticle = (result: ResOptionsModelType<ArticleModelType>) => {
    articleData.value = result.data;
    setHeaderTitle(result.data.article_id, result.data.article_title);
  };

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;

  onUnmounted(() => {
    clearPostInfo.value();
  });
</script>
<style lang="scss">
  @import url('@/components/layout/ArticleCard/ArticleCard.scss');

  @keyframes an-article-card-text {
    0% {
      transform: translateY(10rem);
      opacity: 0;
    }

    100% {
      transform: translateY(0rem);
      opacity: 1;
    }
  }

  .zy-article-card-text {
    animation: an-article-card-text 400ms 200ms;
  }
</style>

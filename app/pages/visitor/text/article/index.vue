<template>
  <CommonMainSection>
    <ZyFetchLoading
      :fetchData="articleListDataLazyFetch"
      @fetchOnload="showArticleList"
    >
      <template #loading>
        <ul class="row-article">
          <li class="clo-article-card" v-for="n in 12">
            <ArticleCard skeleton class="rounded">
              <template #image>
                <ZySkeleton type="image" />
              </template>
              <template #title>
                <ZySkeleton :row="3" />
              </template>
            </ArticleCard>
          </li>
        </ul>
      </template>
      <template #onload>
        <ul class="row-article container">
          <li class="clo-article-card" v-for="item in articleListData.list">
            <ArticleCard :href="`/text/article/${item.article_id}`">
              <template #image>
                <ZyLazyImage
                  :locked="item.has_password"
                  :src="`${cdnUrl}${item.article_title_image}`"
                  alt=""
                />
              </template>
              <template #title>
                <div class="h-full flex flex-col justify-center">
                  <h4
                    class="m-0 portrait:text-base landscape:text-xl portrait:font-normal line-clamp-1"
                  >
                    {{ item.article_title }}
                  </h4>
                  <p
                    class="m-0 mt-2 portrait:text-sm landscape:text-base portrait:line-clamp-1 landscape:line-clamp-3 text-text-2"
                  >
                    {{ item.article_text.replace(/\r\n/g, "") }}
                  </p>
                </div>
              </template>
            </ArticleCard>
          </li>
        </ul>
      </template>
    </ZyFetchLoading>
    <Toolbar>456456</Toolbar>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { article } from "@@/models";
  type ArticleListModelType = article.ArticleList;

  // 获取文章列表
  const articleListDataLazyFetch = await ApiArticle.getArticlesList(null);
  const articleListData = ref<ArticleListModelType>(new article.ArticleList());
  const showArticleList = (
    result: ResOptionsModelType<ArticleListModelType>
  ) => {
    articleListData.value = result.data;
  };

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
</script>

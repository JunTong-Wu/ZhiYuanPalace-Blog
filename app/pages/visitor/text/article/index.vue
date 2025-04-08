<template>
  <CommonMainSection>
    <UCard class="py-8 portrait:py-0">
      <ZyFetchLoading
        :fetchData="articleListDataLazyFetch"
        @fetchOnload="showArticleList"
      >
        <template #loading>
          <ul class="row-article">
            <li
              class="clo-article-card"
              v-for="n in 12"
            >
              <ArticleCard
                skeleton
                class="rounded"
              >
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
            <li
              class="clo-article-card"
              v-for="item in articleListData.list"
            >
              <ArticleCard :href="`/text/article/${item.article_id}`">
                <template #image>
                  <ZyLazyImage
                    :locked="item.has_password"
                    :src="`${cdnUrl}${item.article_title_image}`"
                    alt=""
                    className="bg-level-2"
                  />
                </template>
                <template #title>
                  <div class="h-full flex flex-col justify-center">
                    <h4
                      class="m-0 portrait:text-sm landscape:text-lg portrait:font-normal line-clamp-1"
                    >
                      {{ item.article_title }}
                    </h4>
                    <p
                      class="m-0 portrait:text-xs landscape:text-sm portrait:line-clamp-1 landscape:line-clamp-2 text-text-2"
                    >
                      <span v-if="!item.has_password">{{
                        item.article_text.replace(/\r\n/g, "")
                      }}</span>
                      <span v-else>文章被密码保护，请输入密码查看。</span>
                    </p>
                  </div>
                </template>
              </ArticleCard>
            </li>
          </ul>
        </template>
      </ZyFetchLoading>
    </UCard>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { article } from "@@/models";
  type ArticleListModelType = article.ArticleList;

  // 获取文章列表
  const articleListDataLazyFetch = await ApiArticle.getArticlesList(null);
  const articleListData = ref<ArticleListModelType>(new article.ArticleList());
  const showArticleList = (
    result: ResOptionsModelType<ArticleListModelType>,
  ) => {
    articleListData.value = result.data;
  };

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
</script>

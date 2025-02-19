<template>
  <div>
    <div class="flex flex-col justify-center items-center pt-16 landscape:sm:pt-24">
      <span class="text-theme-500 landscape:sm:text-2xl font-bold mb-2 landscape:sm:mb-4">文章</span>
      <h2 class="text-3xl landscape:sm:text-5xl font-bold">
        阅读最新文章
      </h2>
      <div class="h-1 w-16 bg-theme-500 my-4 landscape:sm:my-8"></div>
    </div>
    <div class="container px-4 pt-8">
      <div class="grid grid-cols-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
        <div class="col-span-12">
          <div class="portrait:p-0 landscape:py-4 xs:py-4 sm:py-6 md:py-7 lg:py-8 pl-0 rounded">
            <ZyFetchLoading :fetchData="articleListDataLazyFetch" @fetchOnload="showArticleList">
              <template #:loading>
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
                <ul class="row-article">
                  <li class="clo-article-card" v-for="item in articleListData.list">
                    <ArticleCard :href="`/text/article/${item.article_id}`">
                      <template #image>
                        <ZyLazyImage :locked="item.has_password" :src="`${cdnUrl}${item.article_title_image}`" alt="" />
                      </template>
                      <template #title>
                        <div class="h-full flex flex-col justify-center">
                          <h4 class="m-0 portrait:text-base landscape:text-xl portrait:font-normal line-clamp-1">
                            {{ item.article_title }}
                          </h4>
                          <p
                            class="m-0 mt-2 portrait:text-sm landscape:text-base portrait:line-clamp-1 landscape:line-clamp-3 text-text-2">
                            {{ item.article_text.replace(/\r\n/g, "") }}
                          </p>
                        </div>
                      </template>
                    </ArticleCard>
                  </li>
                </ul>
              </template>
            </ZyFetchLoading>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center pb-16 landscape:sm:pb-24">
      <ZyButton class="mt-12" @click="$router.push('/text/article')">查看更多</ZyButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { article } from "@@/models";
  type ArticleListModelType = article.ArticleList;

  // 获取文章列表
  const articleListDataLazyFetch = await ApiArticle.getArticlesList({
    page_size: 6,
    page_numer: 1,
  });
  const articleListData = ref<ArticleListModelType>(new article.ArticleList());

  const showArticleList = (result: ResOptionsModelType<ArticleListModelType>) => {
    articleListData.value = result.data;
  };

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
</script>
<template>
  <CommonMainSection>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg portrait:text-sm">所有文章列表</h3>
          <div>
            <ZyButton @click="router.push('/admin/post-manage/article/add')">
              <UIcon
                name="i-solar-add-circle-bold"
                class="w-7 h-7 mr-2"
              />
              添加文章
            </ZyButton>
          </div>
        </div>
      </template>
      <ZyFetchLoading
        :fetchData="articleListDataLazyFetch"
        @fetchOnload="showArticleList"
      >
        <template #onload>
          <ZyDataTable
            :table-data="tableData"
            :table-header="tableHeader"
            selection
          >
            <template v-slot:cell-id="{ row: item }">
              {{ item.article_id ? item.article_id : "--" }}
            </template>
            <template v-slot:cell-title="{ row: item }">
              {{ item.article_title ? item.article_title : "--" }}
            </template>
            <template v-slot:cell-classify="{ row: item }">
              {{ item.classify_title ? item.classify_title : "--" }}
            </template>
            <template v-slot:cell-date="{ row: item }">
              {{
                item.article_date
                  ? dateFormat(item.article_date, "YYYY-MM-DD")
                  : "--"
              }}
            </template>
            <template v-slot:cell-actions="{ row: item }">
              <ZyLink
                :to="getJumpRoutes(item)"
                type="push"
              >
                <div
                  class="w-10 h-10 p-2.5 my-4 bg-level-3 text-text-2 dark:text-text-1 rounded-sm hover:bg-theme-500 dark:hover:bg-theme-100 hover:text-white transition-all"
                >
                  <UIcon
                    name="i-solar-pen-bold"
                    class="w-full h-full"
                  />
                </div>
              </ZyLink>
            </template>
            <template v-slot:cell-sub="{ row: item }">
              <p>Sub Table</p>
            </template>
          </ZyDataTable>
        </template>
      </ZyFetchLoading>
    </UCard>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { article } from "@@/models";
  type Article = article.Article;
  type ArticleListModelType = article.ArticleList;

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;

  const router = useRouter();

  // 获取文章列表
  const articleListDataLazyFetch = await ApiArticle.getArticlesList(null);
  const tableData = ref<Array<Article>>([]);
  const showArticleList = (
    result: ResOptionsModelType<ArticleListModelType>,
  ) => {
    tableData.value.splice(
      0,
      tableData.value.splice.length,
      ...result.data.list,
    );
  };

  const tableHeader = computed(() => {
    let arr: TableHeader[] = [
      {
        name: "ID",
        key: "id",
        sortingField: "article_id",
        columnClass: "portrait:hidden",
      },
      {
        name: "Title",
        key: "title",
        sortingField: "article_title",
      },
      {
        name: "Classify",
        key: "classify",
        columnClass: "portrait:hidden",
      },
      {
        name: "Date",
        key: "date",
        columnClass: "portrait:hidden",
      },
      {
        name: "Actions",
        key: "actions",
      },
    ];
    return arr;
  });

  const goPath = computed(() => {
    return "/admin/post-manage/article";
  });

  const getJumpRoutes = (item: Article) => {
    const id = item.article_id;
    return goPath.value + "/" + id + "/edit";
  };
</script>

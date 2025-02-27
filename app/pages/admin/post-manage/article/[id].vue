<template>
  <CommonMainSection>
    <UCard>
      <ZyFetchLoading
        :fetchData="articleDataLazyFetch"
        @fetchOnload="showArticle"
      >
        <template #loading></template>
        <template #onload>
          <UForm
            :state="articleData"
            class="flex flex-col gap-4"
          >
            <UFormGroup
              name="article_title"
              label="文章标题"
            >
              <UInput
                v-model="articleData.article_title"
                icon="i-solar-text-bold-duotone"
                placeholder="文章标题"
                class="w-full"
                color="indigo"
              >
              </UInput>
            </UFormGroup>
            <UFormGroup
              name="article_text"
              label="文章正文"
            >
              <v-md-editor
                v-model="articleData.article_text"
                height="700px"
              >
              </v-md-editor>
            </UFormGroup>
            <UFormGroup
              name="article_copyright"
              label="原文链接"
            >
              <UInput
                v-model="articleData.article_copyright"
                icon="i-solar-copyright-bold-duotone"
                type="text"
                placeholder="原文链接"
                class="w-full"
                color="lime"
              >
              </UInput>
            </UFormGroup>
            <Toolbar body-background>
              <div class="flex flex-col gap-4">
                <UFormGroup
                  name="article_title_image"
                  label="标题图地址"
                >
                  <UInput
                    v-model="articleData.article_title_image"
                    icon="i-solar-gallery-minimalistic-bold-duotone"
                    placeholder="标题图地址"
                    class="w-full"
                    color="green"
                  >
                  </UInput>
                </UFormGroup>
                <UFormGroup label="标题图预览">
                  <ZyImage
                    :src="`${cdnUrl}${articleData.article_title_image}`"
                    alt=""
                    class="rounded-sm overflow-hidden h-48"
                    className="bg-level-3 object-cover h-full w-full"
                  />
                </UFormGroup>
                <UFormGroup
                  name="article_date"
                  label="发布日期"
                >
                  <UInput
                    v-model="articleData.article_date"
                    icon="i-solar-calendar-date-bold-duotone"
                    type="date"
                    placeholder="日期"
                    class="w-full"
                    color="orange"
                  >
                  </UInput>
                </UFormGroup>
                <UFormGroup
                  name="article_password"
                  label="密码锁"
                >
                  <UInput
                    v-model="articleData.article_password"
                    icon="i-solar-password-bold-duotone"
                    type="text"
                    placeholder="密码锁"
                    class="w-full"
                    color="indigo"
                  >
                  </UInput>
                </UFormGroup>
                <UFormGroup
                  name="article_private"
                  label="仅自己可见"
                >
                  <UToggle
                    v-model="articleData.article_private"
                    color="indigo"
                  />
                </UFormGroup>
              </div>
              <template #footer>
                <ZyButton
                  v-if="isEditMode"
                  class="w-full"
                  @click="updateArticle"
                >
                  <UIcon
                    name="i-solar-file-bold-duotone"
                    class="w-7 h-7 mr-2"
                  />
                  <span>保存修改</span>
                </ZyButton>
                <ZyButton
                  v-else
                  @click="addArticle"
                >
                  <UIcon
                    name="i-solar-upload-bold-duotone"
                    class="w-7 h-7 mr-2"
                  />
                  <span>发布文章</span>
                </ZyButton>
              </template>
            </Toolbar>
          </UForm>
        </template>
      </ZyFetchLoading>
    </UCard>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { article } from "@@/models";

  type ArticleModelType = article.Article;

  const route = useRoute();
  const router = useRouter();
  const id = route.params.id as string;

  const isEditMode = computed(() => route.fullPath.includes("edit"));

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;

  // 获取文章内容
  const articleData = ref<ArticleModelType>(new article.Article());
  let articleDataLazyFetch:
    | LazyAsyncDataRef<ResOptionsModelType<ArticleModelType>>
    | undefined = undefined;
  if (isEditMode.value) {
    articleDataLazyFetch = await ApiArticle.showArticle({ article_id: id });
  }

  const showArticle = (result: ResOptionsModelType<ArticleModelType>) => {
    articleData.value = result.data;

    articleData.value.article_date = dateFormat(
      articleData.value.article_date,
      "YYYY-MM-DD",
    );
  };

  const updateArticle = async () => {
    const { data } = await ApiArticle.updateArticle({
      ...articleData.value,
    });
    if (data.value?.code === 0) {
      console.log("保存成功");
      window.ZyToast({
        title: "保存成功",
        text: "文章已经更新",
      });
    }
  };

  const addArticle = async () => {
    const { data } = await ApiArticle.addArticle({
      ...articleData.value,
    });
    if (data.value?.code === 0) {
      console.log("发布成功");
      window.ZyToast({
        title: "发布成功",
        text: "文章已经发布",
      });
      router.back();
    }
  };

  onMounted(() => {
    if (!isEditMode.value) {
      articleData.value.article_date = dateFormat(
        new Date().toISOString(),
        "YYYY-MM-DD",
      );
    }
  });
</script>

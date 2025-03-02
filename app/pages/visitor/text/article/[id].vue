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
                className="bg-level-2"
              />
            </div>
          </div>
          <div
            v-if="!articleData.has_password"
            class="zy-article-card-text py-8 px-8 portrait:px-0 portrait:-mt-8"
          >
            <UCard
              class="pt-8 xs:pt-10 sm:pt-12 md:pt-14 lg:pt-16 px-4 xs:px-10 sm:px-12 md:px-14 lg:px-16 portrait:rounded-none"
            >
              <h1
                class="font-bold text-3xl mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 mt-0"
              >
                {{ articleData.article_title }}
              </h1>
              <v-md-preview
                ref="previewRef"
                v-if="!articleData.has_password"
                class="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-xl pb-40"
                :text="articleData.article_text"
              ></v-md-preview>
            </UCard>
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
    <Toolbar header-background>
      <template #header>
        <div class="hidden pl-1 pl-2 pl-3 pl-4 pl-0"></div>
        <ul
          v-if="titles.length"
          class="flex flex-col gap-4"
        >
          <li
            v-for="anchor in titles"
            :key="anchor.id"
            :class="[
              'text-text-1 text-base transition-all duration-300 cursor-pointer',
              {
                '!text-indigo-500 scale-110 origin-left':
                  activeAnchor === anchor.id,
              },
              `pl-${anchor.indent * 1}`, // 动态设置缩进，每个层级缩进 10px
            ]"
            @click="scrollTo(anchor.id)"
          >
            {{ anchor.title }}
          </li>
        </ul>
        <div
          v-else
          class="flex flex-col gap-4 items-center"
        >
          <div class="flex">
            <UIcon
              name="i-solar-atom-bold-duotone"
              class="w-12 h-12 opacity-50"
            />
            <UIcon
              name="i-solar-align-left-bold-duotone"
              class="w-12 h-12 opacity-30"
            />
          </div>

          <span class="text-text-3 text-sm">这篇文章没有多级标题</span>
        </div>
      </template>
    </Toolbar>
  </div>
</template>
<script setup lang="ts">
  import { article } from "@@/models";
  type ArticleModelType = article.Article;

  const { setPostInfo, clearPostInfo } = toRefs(store.usePostInfo());
  const setHeaderTitle = (id: number, title: string) => {
    setPostInfo.value(id, "article", title);
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

  // MarkDown渲染后事件
  const previewRef = ref(null);
  const titles = ref<
    { id: string; title: string; lineIndex: string; indent: number }[]
  >([]);
  const activeAnchor = ref("");

  // 为标题动态添加 id
  const generateAnchors = () => {
    const headers = previewRef.value?.$el.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    );
    if (!headers) return;

    titles.value = Array.from(headers).map((header) => {
      const lineIndex = header.getAttribute("data-v-md-line"); // 使用 data-v-md-line 作为唯一标识符
      const slug = `directory-${lineIndex}`; // 生成唯一的 id
      header.id = slug; // 为标题添加 id
      return {
        id: slug,
        title: header.innerText,
        lineIndex,
        indent: parseInt(header.tagName.replace("H", "")) - 1, // 计算缩进层级
      };
    });
  };

  // 获取顶栏高度
  const getHeaderHeight = () => {
    const header = document.getElementById("zy-head-bar");
    return header ? header.offsetHeight : 0;
  };

  // 滚动到指定标题
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    const headerHeight = getHeaderHeight(); // 获取顶栏高度
    if (element) {
      window.scrollTo({
        top: element.offsetTop - headerHeight, // 设置偏移量
        behavior: "smooth",
      });
      activeAnchor.value = id; // 更新当前激活的标题
    }
  };

  // 更新当前激活的标题
  const updateActiveAnchor = () => {
    const headers = previewRef.value?.$el.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    );
    const headerHeight = getHeaderHeight(); // 获取顶栏高度
    if (!headers) return;

    const scrollPosition = window.scrollY; // 获取 window 的滚动位置
    const activeHeader = Array.from(headers).reduce((prev, curr) => {
      const prevTop = prev ? prev.offsetTop : Infinity;
      const currTop = curr.offsetTop - headerHeight; // 考虑顶栏高度
      return scrollPosition < currTop - 10 ? prev : curr;
    }, null);

    if (activeHeader) {
      activeAnchor.value = activeHeader.id;
    }
  };
  onMounted(() => {
    nextTick(() => {
      generateAnchors(); // 在内容渲染完成后生成标题
      window.addEventListener("scroll", updateActiveAnchor);
    });
  });

  // 监听 Markdown 内容变化，重新生成目录
  watch(articleData, () => {
    nextTick(() => {
      generateAnchors();
    });
  });

  onUnmounted(() => {
    clearPostInfo.value();
    window.removeEventListener("scroll", updateActiveAnchor);
  });
</script>
<style lang="scss">
  @import url("@/components/layout/ArticleCard/ArticleCard.scss");

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

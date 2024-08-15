<template>
  <section id="footer-columns" class="relative z-30 landscape:shadow-2xl">
    <div
      class="landscape:bg-bg-bestCard landscape:pl-sidebar portrait:pb-footer"
    >
      <div class="container px-8">
        <div
          class="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12 portrait:hidden"
        >
          <div class="col-span-full sm:col-span-3 md:col-span-4">
            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center mb-8">
              <img
                src="../../../assets/image/logo.png"
                class="max-h-7"
                :alt="$t('zhiYuanPalace')"
              />
              <span class="ml-2 text-xl font-bold">{{
                $t("zhiYuanPalace")
              }}</span>
            </NuxtLink>
            <p class="mb-12 text-text-2">
              {{ $t("bannerSlogan1") }}
            </p>
            <!-- Socials -->
            <ul class="flex space-x-2">
              <li v-for="socialLink in socialLinks">
                <a
                  :href="socialLink.href"
                  @click.prevent="socialLink.onclick()"
                >
                  <ZyButton type="icon">
                    <ZyIcon :defaultName="socialLink.icon" size="1.25rem" />
                  </ZyButton>
                </a>
              </li>
            </ul>
          </div>

          <div class="col-span-full sm:col-span-3 md:col-span-2 md:col-start-7">
            <h3 class="mb-6 text-lg">鸣谢</h3>
            <ul>
              <li v-for="thanksLink in thanksLinks">
                <a
                  :href="thanksLink.href"
                  @click.prevent="thanksLink.onclick()"
                >
                  <ZyButton type="text">{{ thanksLink.name }}</ZyButton>
                </a>
              </li>
            </ul>
          </div>

          <div class="col-span-full sm:col-span-3 md:col-span-2">
            <h3 class="mb-6 text-lg">开源</h3>
            <ul>
              <li v-for="openSourceLink in openSourceLinks">
                <a
                  :href="openSourceLink.href"
                  @click.prevent="openSourceLink.onclick()"
                >
                  <ZyButton type="text">{{ openSourceLink.name }}</ZyButton>
                </a>
              </li>
            </ul>
          </div>

          <div class="col-span-full sm:col-span-3 md:col-span-2">
            <h3 class="mb-6 text-lg">友链</h3>
            <ZyFetchLoading
              :fetchData="(friendsListData as any)"
              :minLoadingNumber="3"
              :max-data-length="3"
            >
              <template v-slot:loading>
                <ZyButton type="text" class="w-28">
                  <ZySkeleton :row="1"/>
                </ZyButton>
              </template>
              <template v-slot:onload="{ row: item }">
                <a :href="item.friend_path" target="_blank">
                  <ZyButton type="text">{{ item.friend_title }}</ZyButton>
                </a>
              </template>
            </ZyFetchLoading>
            <ZyButton type="text" @click.prevent="showMoreFriends()"
              >更多</ZyButton
            >
          </div>
        </div>
        <div
          class="flex flex-col items-center justify-between landscape:flex-row landscape:space-y-2 py-8 portrait:py-0"
        >
          <span class="text-sm portrait:hidden"
            >©2024 {{ $t("zhiYuanPalace") }}</span
          >
          <ul
            class="flex flex-wrap landscape:space-x-4 portrait:flex-col portrait:items-center portrait:text-text-3"
          >
            <template v-for="copyrightLink in copyrightLinks">
              <li :class="{ 'portrait:hidden': copyrightLink.mobileHide }">
                <a
                  :href="copyrightLink.href"
                  @click.prevent="copyrightLink.onclick()"
                >
                  <ZyButton type="text" class="text-sm portrait:text-xs">{{
                    copyrightLink.name
                  }}</ZyButton>
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ApiFriend } from "~/utils";

const router = useRouter();

const socialLinks = [
  {
    name: "WeChat",
    icon: "wechat",
    href: "",
    onclick: () => {
      // window.open('https://wechats.deothemes.com')
      console.log("wechat");
    },
  },
  {
    name: "QQ",
    icon: "QQ",
    href: "",
    onclick: () => {
      // window.open('https://wechats.deothemes.com')
      console.log("qq");
    },
  },
  {
    name: "douyin",
    icon: "douyin",
    href: "",
    onclick: () => {
      // window.open('https://qzone.deothemes.com')
      console.log("douyin");
    },
  },
];

const thanksLinks = [
  {
    name: "腾讯云",
    href: "https://cloud.tencent.com/",
    onclick: () => {
      window.open("https://cloud.tencent.com/");
    },
  },
  {
    name: "Nuxt",
    href: "https://nuxt.com/",
    onclick: () => {
      window.open("https://nuxt.com/");
    },
  },
  {
    name: "QQ音乐",
    href: "https://y.qq.com/",
    onclick: () => {
      window.open("https://y.qq.com/");
    },
  },
  {
    name: "混元大模型",
    href: "https://hunyuan.tencent.com/",
    onclick: () => {
      window.open("https://hunyuan.tencent.com/");
    },
  },
];

const openSourceLinks = [
  {
    name: "开发文档",
    href: "",
    onclick: () => {
      console.log("开源文档");
    },
  },
  {
    name: "Github",
    href: "",
    onclick: () => {
      console.log("Github");
    },
  },
];

const copyrightLinks = [
  {
    name: "鄂ICP备2022016355号-1",
    href: "https://beian.miit.gov.cn/",
    mobileHide: false,
    onclick: () => {
      window.open("https://beian.miit.gov.cn/");
    },
  },
  {
    name: "隐私政策",
    href: "",
    mobileHide: true,
    onclick: () => {
      console.log("隐私政策");
    },
  },
  {
    name: "条款和条件",
    href: "",
    mobileHide: true,
    onclick: () => {
      console.log("条款和条件");
    },
  },
];

// 获取友链列表
const friendsListData = await ApiFriend.search_friends_all();

const showMoreFriends = () => {
  router.push("/about/friend");
};
</script>

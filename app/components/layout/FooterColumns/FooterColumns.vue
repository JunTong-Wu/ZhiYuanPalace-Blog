<template>
  <section id="footer-columns">
    <CommonMainSection
      no-padding-top
      no-padding-main
    >
      <UCard class="portrait:mb-footer">
        <div class="container px-8">
          <div
            class="grid gap-x-7 gap-y-14 pt-12 pb-6 grid-cols-12 portrait:hidden"
          >
            <div class="col-span-full md:col-span-8">
              <!-- Logo -->
              <ZyLink
                to="/"
                class="flex items-center mb-8"
              >
                <Logo class="block portrait:hidden cursor-pointer" />
              </ZyLink>
              <div class="max-w-96">
                <p class="mb-12 text-text-2">
                  {{ $t("home.briefIntroductionContent") }}
                </p>
              </div>

              <!-- Socials -->
              <ul class="flex space-x-2">
                <li v-for="socialLink in socialLinks">
                  <ZyButton
                    type="icon"
                    class="p-2"
                    @click="socialLink.onclick()"
                  >
                    <UIcon
                      :name="socialLink.icon"
                      class="w-5 h-5"
                    />
                  </ZyButton>
                </li>
              </ul>
            </div>

            <div class="col-span-6 sm:col-span-3 md:col-span-2">
              <h3 class="mb-6 text-lg">鸣谢</h3>
              <ul>
                <li v-for="thanksLink in thanksLinks">
                  <ZyLink
                    :to="thanksLink.href"
                    type="outside"
                  >
                    <ZyButton
                      type="text"
                      class="py-2"
                      >{{ thanksLink.name }}
                      <UIcon
                        name="i-solar-arrow-right-up-linear"
                        class="w-4 h-4 ml-1"
                      />
                    </ZyButton>
                  </ZyLink>
                </li>
              </ul>
            </div>

            <div class="col-span-6 sm:col-span-3 md:col-span-2">
              <h3 class="mb-6 text-lg">友链</h3>
              <ZyFetchLoading
                :fetchData="friendsListDataFetch"
                @fetchOnload="showFriendList"
              >
                <template #loading>
                  <ul>
                    <li v-for="n in 3">
                      <ZyButton
                        type="text"
                        class="w-28 py-2"
                      >
                        <ZySkeleton :row="1" />
                      </ZyButton>
                    </li>
                  </ul>
                </template>
                <template #onload>
                  <ul>
                    <li v-for="(item, index) in friendsListData.data">
                      <ZyLink
                        v-if="index < 3"
                        :to="item.friend_path"
                        type="outside"
                      >
                        <ZyButton
                          type="text"
                          class="py-2"
                          >{{ item.friend_title }}
                          <UIcon
                            name="i-solar-arrow-right-up-linear"
                            class="w-4 h-4 ml-1"
                          />
                        </ZyButton>
                      </ZyLink>
                    </li>
                  </ul>
                </template>
              </ZyFetchLoading>
              <ZyLink
                type="push"
                class="py-2"
                to="/about/friend"
                >更多</ZyLink
              >
            </div>
          </div>
          <div
            class="flex flex-col items-center justify-between landscape:flex-row"
          >
            <span class="text-sm portrait:hidden"
              >©2024 {{ $t("common.zhiYuanPalace") }}</span
            >
            <ul
              class="flex flex-wrap landscape:space-x-4 portrait:flex-col portrait:items-center portrait:text-text-3"
            >
              <template v-for="copyrightLink in copyrightLinks">
                <li>
                  <ZyLink
                    :to="copyrightLink.href"
                    type="outside"
                  >
                    <ZyButton
                      type="text"
                      class="!text-sm portrait:!text-xs"
                      >{{ copyrightLink.name }}</ZyButton
                    >
                  </ZyLink>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </UCard>
    </CommonMainSection>
  </section>
</template>
<script setup lang="ts">
  import "./transition.scss";
  import { ApiFriend } from "~/utils";

  const router = useRouter();

  const socialLinks = [
    {
      name: "WeChat",
      icon: "i-cib-wechat",
      onclick: () => {
        // window.open('https://wechats.deothemes.com')
        console.log("wechat");
      },
    },
    {
      name: "QQ",
      icon: "i-cib-qq",
      onclick: () => {
        // window.open('https://wechats.deothemes.com')
        console.log("qq");
      },
    },
    {
      name: "douyin",
      icon: "i-cib-tiktok",
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
    },
    {
      name: "Nuxt",
      href: "https://nuxt.com/",
    },
    {
      name: "QQ音乐",
      href: "https://y.qq.com/",
    },
    {
      name: "混元大模型",
      href: "https://hunyuan.tencent.com/",
    },
  ];

  const copyrightLinks = [
    {
      name: "鄂ICP备2022016355号-1",
      href: "https://beian.miit.gov.cn/",
    },
  ];

  // 获取友链列表
  const friendsListDataFetch = await ApiFriend.getFriendsList();
  const friendsListData = ref<ResOptionsModelType<any>>({
    data: [],
    code: 0,
    message: "",
  });
  const showFriendList = (result: ResOptionsModelType<any>) => {
    friendsListData.value = result;
  };

  const showMoreFriends = () => {
    router.push("/about/friend");
  };
</script>

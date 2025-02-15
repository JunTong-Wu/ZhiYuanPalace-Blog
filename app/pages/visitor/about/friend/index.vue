<template>
  <CommonMainSection>
    <div class="container">
      <UAlert color="theme" class="mb-4 !text-white" description="评论区暂未开发，如果想要申请友链，请发送至邮箱 wjtyyds@vip.qq.com"
        title="申请友链" icon="i-solar-link-round-linear" />
    </div>

    <ZyFetchLoading :fetchData="(friendsListDataFetch as any)" @fetchOnload="showFriendList">
      <template #onload>
        <ul class="row-friend container">
          <li class="clo-friend-card" v-for="(item, index) in friendsListData.data">
            <div class="rounded border border-borderColor bg-level-1 p-4 sm:p-6 h-full flex flex-col justify-between">
              <div class="flex sm:flex-col gap-4 sm:gap-0">
                <figure class="relative">
                  <ZyLink :to="item.friend_path" type="outside">
                    <img :src="item.friend_icon" :alt="item.friend_title" width="230" height="230"
                      class="w-16 sm:w-full rounded-2xs">

                  </ZyLink>
                </figure>
                <div class="flex-1">
                  <div class="mt-4 flex items-center justify-between">
                    <ZyLink :to="item.friend_path" type="outside">
                      <span class="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">{{
                        item.friend_title }}</span>
                    </ZyLink>
                  </div>
                  <div class="mt-2 text-sm">
                    <span class="dark:text-jacarta-300">{{ item.friend_text }}</span>
                  </div>
                </div>

              </div>

              <div class="mt-4 sm:mt-8 flex items-center justify-between">
                <button type="button" class="font-display text-sm font-semibold text-accent">
                  {{ item.frd_coll_title }}
                </button>
                <div class="flex items-center space-x-1">
                  <span class="js-likes relative cursor-pointer">
                    <UIcon name="i-solar-fire-linear" class="w-4 h-4" />
                  </span>
                  <span class="text-sm dark:text-jacarta-200">54</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>

    </ZyFetchLoading>
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
  // 获取友链列表
  const friendsListDataFetch = await ApiFriend.getFriendsList();
  const friendsListData = ref<ResOptionsModelType<any>>({
    data: [],
    code: 0,
    message: "",
  });
  const showFriendList = (result: ResOptionsModelType<any>) => {
    friendsListData.value = result;
  }
</script>

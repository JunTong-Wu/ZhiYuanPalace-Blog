<template>
  <div class="pt-header">
    <img src="@/assets/image/banner.jpg" alt="" class="h-[18.75rem] object-cover" />
    <div class="relative pb-12 pt-28 bg-level-1">
      <div class="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <figure class="relative">
          <img src="@/assets/image/avatar.jpg" alt="collection avatar"
            class="h-40 rounded-xs border-[5px] border-white dark:border-jacarta-600">
          <div
            class="absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 dark:border-jacarta-600"
            data-tippy-content="Verified Collection">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
              class="h-[.875rem] w-[.875rem] fill-white">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
            </svg>
          </div>
        </figure>
      </div>
      <div class="container text-center px-12">
        <h2 class="my-4 font-display text-3xl font-medium text-text-1">玉淇冰-Mebius</h2>
        <div
          class="mb-8 inline-flex items-center justify-center rounded-full border border-borderColor bg-level-3 py-1.5 px-4 text-text-2">
          <UIcon name="i-cib-qq" class="w-3 h-3 mr-2" />
          <span>570446022</span>
        </div>
        <p class="mx-auto mb-2 max-w-xl text-lg text-text-2">
          “多巴胺分泌模型”永远算不准某人突然望向某人的那个瞬间。
        </p>
        <span class="text-text-3">The dopamine secretion model can never accurately predict the moment when someone
          suddenly looks at someone.</span>
        <div class="mt-6 flex items-center justify-center space-x-2.5 text-text-2">
          <ZyButton type="icon" class="p-4 !bg-level-3 !rounded-xs border border-borderColor">
            <UIcon name="i-solar-heart-linear" class="w-4 h-4" />
          </ZyButton>
          <ZyButton type="icon" class="p-4 !bg-level-3 !rounded-xs border border-borderColor">
            <UIcon name="i-solar-share-bold" class="w-4 h-4" />
          </ZyButton>
          <ZyButton type="icon" class="p-4 !bg-level-3 !rounded-xs border border-borderColor">
            <UIcon name="i-solar-menu-dots-bold" class="w-4 h-4" />
          </ZyButton>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
</script>

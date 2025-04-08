<template>
  <aside
    class="zy-side-bar text-text-1 select-none scrollbar-hidden transition-all"
    :class="{
      'px-4': !hide,
      'px-2': hide,
    }"
  >
    <!-- 图标区 -->
    <div class="h-20 w-full relative z-10 flex items-center -ml-2">
      <Logo
        class="cursor-pointer transition-all duration-300"
        @click="backToHome"
        :class="{
          'w-full pl-2': !hide,
          'w-0 opacity-0 blur -translate-x-12': hide,
        }"
      />
      <div class="flex items-center h-20 w-20 p-5 absolute -right-4 flex-none">
        <!-- 收起侧边导航栏按钮 -->
        <ZyButton
          class="flex items-center justify-center w-full h-full"
          @click="switchSidebarClick"
          title="收起侧边栏"
          type="icon"
        >
          <UIcon
            v-if="!hide"
            name="i-ph-text-outdent"
            class="w-5 h-5"
          />
          <UIcon
            v-if="hide"
            name="i-ph-text-indent"
            class="w-5 h-5"
          />
        </ZyButton>
      </div>
    </div>

    <!-- 上层 -->
    <div class="mb-8"></div>
    <AdminNavigation
      v-if="isAdminSidebar"
      :hide="hide"
      class="relative z-10"
    />
    <DocumentNavigation
      v-if="isDocumentSidebar"
      :hide="hide"
      class="relative z-10"
    />
    <VisitorNavigation
      v-if="!isDocumentSidebar && !isAdminSidebar"
      :hide="hide"
      class="relative z-10"
    />
  </aside>
</template>
<script setup lang="ts">
  const props = defineProps({
    isAdminSidebar: {
      type: Boolean,
      default: false,
    },
    isDocumentSidebar: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(["switchSidebarClick"]);

  // 切换侧边栏
  const switchSidebarClick = () => {
    emit("switchSidebarClick");
  };

  const router = useRouter();
  const backToHome = () => {
    router.replace("/");
  };
</script>

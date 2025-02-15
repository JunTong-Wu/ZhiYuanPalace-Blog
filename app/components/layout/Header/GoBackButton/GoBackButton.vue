<template>
  <div class="portrait:mr-4">
    <div class="portrait:hidden" v-if="gobackFlag">
      <ZyButton class="flex items-center justify-center p-2" @click="goback()" title="返回" type="icon">
        <ZyIcon size="1.5rem" defaultName="i-solar-alt-arrow-left-linear" />
      </ZyButton>
    </div>
    <div class="landscape:hidden" v-if="gobackFlag">
      <ZyButton v-if="gobackFlag" class="w-header h-header" @click="goback()" title="返回" type="transparent">
        <ZyIcon size="1.25rem" defaultName="i-solar-alt-arrow-left-linear" />
      </ZyButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();

  const isFirstLayer = (path: string) => {
    // 移除路径两端的斜杠，然后分割路径
    const parts = path
      .trim()
      .replace(/^\/+|\/+$/g, "")
      .split("/");

    // 如果路径是"/"或者分割后的部分数量小于等于2，则返回true
    // 否则返回false
    return path === "/" || (parts.length <= 2 && parts[0] !== "");
  };
  const gobackFlag = ref(false);
  const gobackInit = (path: string) => {
    if (isFirstLayer(path)) {
      gobackFlag.value = false;
    } else {
      gobackFlag.value = true;
    }
  };
  gobackInit(route.fullPath);
  router.beforeEach((to: { fullPath: string }, from: any, next: () => void) => {
    gobackInit(to.fullPath);
    next();
  });
  const getParentPath = () => {
    let currentPath = window.location.pathname;
    let lastIndex = currentPath.lastIndexOf("/");
    // 如果当前路径已经是根路径，或者只有一个斜杠，则没有上一级路径
    if (lastIndex <= 0) {
      return "/";
    }
    // 去掉最后一个路径段
    let parentPath = currentPath.slice(0, lastIndex);
    // 去掉尾部斜杠
    return parentPath.replace(/\/+$/, "");
  };
  const goback = () => {
    router.replace(getParentPath());
  };
</script>

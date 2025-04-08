<template>
  <div>
    <div
      class="portrait:hidden"
      v-if="gobackFlag"
    >
      <ZyButton
        class="flex items-center justify-center p-2"
        @click="goback()"
        title="返回"
        type="text"
      >
        <ZyIcon
          size="2rem"
          defaultName="i-solar-round-alt-arrow-left-line-duotone"
        />
      </ZyButton>
    </div>
    <div
      class="landscape:hidden"
      v-if="gobackFlag"
    >
      <ZyButton
        v-if="gobackFlag"
        class="w-header h-header"
        @click="goback()"
        title="返回"
        type="transparent"
      >
        <ZyIcon
          size="1.25rem"
          defaultName="i-solar-alt-arrow-left-linear"
        />
      </ZyButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    isAdminRule: {
      type: Boolean,
      default: false,
    },
  });

  const route = useRoute();
  const router = useRouter();

  const disableButton = (path: string, level: number) => {
    // 移除路径两端的斜杠，然后分割路径
    const parts = path
      .trim()
      .replace(/^\/+|\/+$/g, "")
      .split("/");

    // 如果路径是"/"或者分割后的部分数量小于等于level+1，则返回true
    // 否则返回false
    return path === "/" || (parts.length <= level + 1 && parts[0] !== "");
  };
  const gobackFlag = ref(false);
  const gobackInit = (path: string) => {
    if (!props.isAdminRule) {
      if (disableButton(path, 1)) {
        gobackFlag.value = false;
      } else {
        gobackFlag.value = true;
      }
    } else {
      if (disableButton(path, 2)) {
        gobackFlag.value = false;
      } else {
        gobackFlag.value = true;
      }
    }
  };
  gobackInit(route.fullPath);
  router.beforeEach((to: { fullPath: string }, from: any, next: () => void) => {
    gobackInit(to.fullPath);
    next();
  });
  // const getParentPath = () => {
  //   let currentPath = window.location.pathname;
  //   let lastIndex = currentPath.lastIndexOf("/");
  //   // 如果当前路径已经是根路径，或者只有一个斜杠，则没有上一级路径
  //   if (lastIndex <= 0) {
  //     return "/";
  //   }
  //   // 去掉最后一个路径段
  //   let parentPath = currentPath.slice(0, lastIndex);
  //   // 去掉尾部斜杠
  //   return parentPath.replace(/\/+$/, "");
  // };
  const goback = () => {
    router.go(-1);
  };
</script>

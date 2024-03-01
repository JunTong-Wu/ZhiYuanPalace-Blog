<template>
  <div class="horizontal-layout" ml-4 v-if="gobackFlag">
    <zy-button
      flex
      items-center
      justify-center
      @click="goback()"
      title="返回"
      type="icon"
    >
      <ZyIcon size="0.75rem" defaultName="arrow-left" />
    </zy-button>
  </div>
  <div class="vertical-layout" v-if="gobackFlag">
    <zy-button
    v-if="gobackFlag"
      w-header
      h-header
      @click="goback()"
      title="返回"
      type="transparent"
    >
      <ZyIcon defaultName="arrow-left" />
    </zy-button>
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
router.beforeEach((to, from, next) => {
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

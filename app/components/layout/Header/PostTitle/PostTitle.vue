<template>
  <div v-if="type != 'unknown'" class="post-title line-clamp-1">
    {{ titleString }}
  </div>
</template>
<script setup lang="ts">
// Pinia仓库
const { title, type } = toRefs(
  store.usePostInfo()
);
const postTypeMap = {
  article: '文章',
  shuoshuo: '说说',
  song: '歌曲',
  album: '相册',
  video: '视频',
  site: '站点',
  unknown: '未知',
};
const titleString = ref('')

const showTitleString = () => {
  if (type.value) {
    titleString.value = `${postTypeMap[type.value]} - ${title.value}`;
  }
}
showTitleString();
watch(
  [title, type],
  () => {
    showTitleString();
  },
  {
    immediate: true,
  }
);

</script>
<style lang="scss" scoped>
.post-title {
  transform: translateX(100%);
  opacity: 0;
  animation: an-fade-in-from-left 400ms 400ms forwards;
}
</style>
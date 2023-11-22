<template>
  <zy-header>
    <div flex justify-between h-full>
      <div>
        <zy-button h-full px-4>
          <ZyIcon name="Search12" :filled="true" color="inherit" />
        </zy-button>
      </div>
      <div flex items-center justify-center px-4>
        <img h-7 src="@/src/assets/image/logo.png" alt="logo" />
        <span p-4 font-bold text-xs>ZHIYUANPALACE</span>
      </div>
      <div>
        <zy-button h-full px-4 @click="darkModeSwitch">
          <ZyIcon name="MoreHorizontal16" :filled="true" color="inherit" />
        </zy-button>
      </div>
    </div>
  </zy-header>
</template>
<script setup lang="ts">
const darkModeSwitch = () => {
  if (!document.documentElement.classList.contains("dark")) {
    //切换主题
    document.documentElement.classList.add("dark");
  } else {
    //切换主题
    document.documentElement.classList.remove("dark");
  }
};
</script>

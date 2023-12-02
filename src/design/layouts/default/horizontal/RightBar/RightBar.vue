<template>
  <zy-side-bar>
    <div h-full flex flex-col justify-between>
      <div>
        <zy-button h-header px-4 w-full>
          <div flex justify-between>
            <span text-xs color-text-3>全局搜索</span>
            <ZyIcon
              name="Search16"
              :filled="true"
              filled-color="var(--text-2)"
            />
          </div>
        </zy-button>
      </div>
      <div w-full>
        <zy-button w-full h-header px-4 @click="darkModeSwitch">
          Dark Mode
        </zy-button>
      </div>
    </div>
  </zy-side-bar>
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

<style></style>

<template>
  <zy-side-bar>
    <div h-full flex flex-col justify-between>
      <div flex justify-end h-header>
        <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
          <ZyIcon name="ArrowUp16" filled-color="var(--text-2)" />
        </zy-button>
        <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
          <ZyIcon name="FullScreenMaximize16" filled-color="var(--text-2)" />
        </zy-button>
        <zy-button
          w="[25%]"
          h-full
          px-4
          flex
          items-center
          justify-center
          @click="darkModeSwitch"
        >
          <ZyIcon name="WeatherMoon16" filled-color="var(--text-2)" />
        </zy-button>
        <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
          <ZyIcon name="Settings16" filled-color="var(--text-2)" />
        </zy-button>
      </div>
      <div flex justify-end h-header>
        <zy-button w="[25%]" h-full px-4 flex items-center justify-center
          ><ZyIcon name="ArrowUp16" filled-color="var(--text-2)"
        /></zy-button>
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

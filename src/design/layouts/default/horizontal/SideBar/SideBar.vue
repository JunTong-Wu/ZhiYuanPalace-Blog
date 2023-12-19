<template>
  <zy-side-bar>
    <div h-full flex flex-col justify-between>
      <div>
        <div h-header md:h-header-xl></div>
        <zy-button h-header md:h-header-xl px-4 w-full>
          <div flex justify-between>
            <span text-xs color-text-3>全局搜索</span>
            <ZyIcon
              lineName="iconamoon:search-duotone"
              lineColor="var(--text-1)"
            />
          </div>
        </zy-button>
      </div>
      <div></div>
    </div>
  </zy-side-bar>
</template>

<script setup lang="ts"></script>

<style></style>

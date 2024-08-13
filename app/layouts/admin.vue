<template>
  <div id="layout-simple" class="relative">
    <AdminHeader v-if="!isLoginPage" class="fixed top-0 z-40 h-header w-full" />
    <div id="layout-simple-main" class="layout-simple-main relative z-20">
      <main>
        <div class="main-view text-base relative">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const isLoginPage = computed(() =>{ return route.path === '/login'})

// 切换全屏
const fullScreenFlag = ref(false);
const toggleFullScreen = () => {
  if (fullScreenFlag.value == false) {
    fullScreenFlag.value = true;
    fullScreen();
  } else {
    fullScreenFlag.value = false;
    fullExit();
  }
};
</script>
<style>
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
}
</style>

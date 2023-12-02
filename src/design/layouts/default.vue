<template>
  <div h-full>
    <div class="vertical-layout">
      <verticalHeader />
    </div>
    <div flex>
      <div class="horizontal-layout">
        <horizontalSideBar />
      </div>
      <div flex-1>
        <slot />
      </div>
      <div class="horizontal-layout">
        <horizontalRightBar />
      </div>
    </div>
    <div class="vertical-layout">
      <verticalFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
import verticalHeader from "./default/vertical/Header/Header.vue";
import verticalFooter from "./default/vertical/Footer/Footer.vue";
import horizontalSideBar from "./default/horizontal/SideBar/SideBar.vue";
import horizontalRightBar from "./default/horizontal/RightBar/RightBar.vue";
</script>

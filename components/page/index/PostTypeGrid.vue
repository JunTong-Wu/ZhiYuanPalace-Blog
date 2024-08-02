<template>
  <div id="service-grid" class="gap-4 grid grid-cols-12 pt-8" >
    <div
        v-for="(item, i) in items"
        :data-index="i"
        class="service-card pt-8 portrait:col-span-6 landscape:col-span-4 relative"
    >
      <NuxtLink :to="item.path" class="card-inner h-full relative rounded-3xl shadow-sm" >
        <div class="border-layout absolute inset-0 overflow-hidden rounded-3xl"></div>
        <div class="content-layout h-full overflow-hidden p-1 relative rounded-3xl z-1" >
          <div class="h-full px-6 portrait:px-2 pt-12 pb-8 rounded-[1.25rem] text-center bg-bg-bestCard" >
            <h3 class="text-text-1 text-3xl my-2 font-bold portrait:text-2xl portrait:font-normal font-vivo" >{{ $t(item.title) }}</h3>
            <p class="text-text-2 text-base portrait:text-xs whitespace-pre-line">{{ $t(item.text) }}</p>
          </div>
        </div>
        <div class="absolute h-16 w-16 left-1/2 -ml-8 -top-8 overflow-hidden shadow-sm z-2 rounded-2xl rounded-tr-none">
          <div class="absolute bg-bg-opaque flex h-full inset-0 items-center justify-center" >
            <div class="flex h-16 items-center justify-center w-full">
              <ZyIcon
                  :default-linear-gradient="{
                  direction: 'bottom',
                  from: 'var(--theme-color)',
                  to: 'var(--text-1)',
                }"
                  :default-name="item.defaultIcon"
                  size="2rem"
              />
            </div>
          </div>
          <div class="active-layout absolute bg-theme h-full inset-0">
            <div class="flex h-16 items-center justify-center w-full">
              <ZyIcon :activated="true" :activated-name="item.activatedIcon" activated-color="white" size="2rem" />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const items = ref([
  {
    title: "article",
    text: "articleModuleSlogan",
    defaultIcon: "article-default",
    activatedIcon: "article-activated",
    path: "/text/article",
  },
  {
    title: "shuoshuo",
    text: "shuoshuoModuleSlogan",
    defaultIcon: "shuoshuo-default",
    activatedIcon: "shuoshuo-activated",
    path: "/text/shuoshuo",
  },
  {
    title: "music",
    text: "musicModuleSlogan",
    defaultIcon: "music-default",
    activatedIcon: "music-activated",
    path: "/music",
  },
  {
    title: "photo",
    text: "photoModuleSlogan",
    defaultIcon: "photo-default",
    activatedIcon: "photo-activated",
    path: "/audio/photo",
  },
  {
    title: "video",
    text: "videoModuleSlogan",
    defaultIcon: "video-default",
    activatedIcon: "video-activated",
    path: "/audio/video",
  },
  {
    title: "friend",
    text: "friendModuleSlogan",
    defaultIcon: "friend-default",
    activatedIcon: "friend-activated",
    path: "/about/friend",
  },
]);

onMounted(() => {

  const mouse = { x: 0, y: 0 };

  function onWindowResize() {
    setTimeout(() => {
      if (isMobileDevice()) {
        mouse.x = 0;
        mouse.y = 0;
      }
    }, 20);
  }

  function onMouseMove(event) {
    if (!isMobileDevice() && !isVertical()) {
      const cards = document.querySelectorAll(".service-card");
      for (const card of cards) {
        // 重新获取元素的当前位置
        const center = getElementCenterByElement(card);
        card.style.setProperty("--x", `${event.clientX - center.x}px`);
        card.style.setProperty("--y", `${event.clientY - center.y}px`);
      }
      // 更新mouse
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }
  }

  function onScroll() {
    if (!isMobileDevice() && !isVertical()) {
      const cards = document.querySelectorAll(".service-card");
      for (const card of cards) {
        // 重新获取元素的当前位置
        const center = getElementCenterByElement(card);
        card.style.setProperty("--x", `${mouse.x - center.x}px`);
        card.style.setProperty("--y", `${mouse.y - center.y}px`);
      }
    }
  }

  // 监听最顶级祖先section标签
  const root = document.querySelector("#service-grid");
  getAncestorSectionByElement(root).addEventListener("mousemove", onMouseMove);
  // document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onWindowResize);
});
</script>
<style lang="scss" scoped>
.border-layout::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: radial-gradient(closest-side circle, rgba(var(--theme-color-rgb), 0.6) 0%, transparent);
  transform: translate(var(--x, -100rem), var(--y, -100rem)) scale(2);
}

#service-grid {
  > div {
    .active-layout {
      height: 0;
      overflow: hidden;
      transition: all 0.5s ease;
    }
  }
}
@media (orientation: portrait) {
  .border-layout {
    display: none;
  }
}
</style>
<style>
:root.mobile {
  .border-layout {
    display: none;
  }
}
:root.pc {
  #service-grid > div:hover {
    .active-layout {
      height: 100%;
    }
  }
}
</style>

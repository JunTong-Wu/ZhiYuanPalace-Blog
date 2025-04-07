<template>
  <div
    class="bg-level-1 py-16 px-4 landscape:sm:py-24 landscape:px-16 landscape:sm:px-24"
  >
    <div class="flex flex-col justify-center items-center">
      <span
        class="text-theme-500 dark:text-theme-100 landscape:sm:text-2xl font-bold mb-2 landscape:sm:mb-4"
        >更多</span
      >
      <h2 class="text-3xl landscape:sm:text-5xl font-bold">
        阅读更多种类的内容
      </h2>
      <div
        class="h-1 w-16 bg-theme-500 dark:bg-theme-100 my-4 landscape:sm:my-8"
      ></div>
      <p class="text-lg text-text-2 portrait:text-base mb-4">
        『知鸢宫』包含以下内容分类，你可以点击进入查看
      </p>
    </div>
    <div
      id="service-grid"
      class="container gap-2 grid grid-cols-12 pt-8"
    >
      <div
        v-for="(item, i) in items"
        :data-index="i"
        class="service-card pt-12 portrait:col-span-6 landscape:col-span-4 relative"
      >
        <NuxtLink
          :to="item.path"
          class="card-inner h-full relative rounded-lg shadow-sm"
        >
          <div
            class="border-layout absolute inset-0 overflow-hidden rounded-lg"
          ></div>
          <div
            class="content-layout h-full overflow-hidden p-1 relative rounded-lg z-1"
          >
            <div
              class="h-full px-6 portrait:px-2 pt-12 pb-12 rounded-md text-center bg-level-3"
            >
              <h3
                class="text-text-1 text-2xl my-2 portrait:text-xl portrait:font-normal"
              >
                {{ $t(`menu.${item.name}`) }}
              </h3>
              <p
                class="text-text-2 text-base portrait:text-xs whitespace-pre-line"
              >
                {{ $t(item.text) }}
              </p>
            </div>
          </div>
          <div
            class="absolute h-16 w-16 left-1/2 -ml-8 -top-8 overflow-hidden shadow-xl z-2 rounded rounded-tr-none"
          >
            <div
              class="absolute bg-level-4 flex h-full inset-0 items-center justify-center"
            >
              <div class="flex h-16 items-center justify-center w-full">
                <ZyIcon
                  :default-name="getSelfIconByName(item.name).activatedIcon"
                  size="1.5rem"
                />
              </div>
            </div>
            <div
              class="active-layout absolute bg-theme-500 dark:bg-theme-100 h-full inset-0"
            >
              <div class="flex h-16 items-center justify-center w-full">
                <ZyIcon
                  :activated="true"
                  :activated-name="getSelfIconByName(item.name).activatedIcon"
                  activated-color="white"
                  size="1.5rem"
                />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
  const items = ref([
    {
      text: "home.articleModuleSlogan",
      path: "/text/article",
      name: "article",
    },
    {
      text: "home.shuoshuoModuleSlogan",
      path: "/text/shuoshuo",
      name: "shuoshuo",
    },
    {
      text: "home.musicModuleSlogan",
      path: "/music",
      name: "music",
    },
    {
      text: "home.photoModuleSlogan",
      path: "/audio/photo",
      name: "photo",
    },
    {
      text: "home.videoModuleSlogan",
      path: "/audio/video",
      name: "video",
    },
    {
      text: "home.friendModuleSlogan",
      path: "/about/friend",
      name: "friend",
    },
  ]);

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

  onMounted(() => {
    const root = document.querySelector("#service-grid");
    // 监听最顶级祖先section标签
    getAncestorSectionByElement(root).addEventListener(
      "mousemove",
      onMouseMove,
    );
    // document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onWindowResize);
  });

  onUnmounted(() => {
    const root = document.querySelector("#service-grid");
    getAncestorSectionByElement(root).removeEventListener(
      "mousemove",
      onMouseMove,
    );
    document.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onWindowResize);
  });
</script>
<style lang="scss" scoped>
  .border-layout::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: radial-gradient(
      closest-side circle,
      rgba(var(--theme-color-rgb), 0.6) 0%,
      transparent
    );
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

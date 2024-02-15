<template>
  <a
    class="zy-store-style-card"
    bg="bg-3"
    w-full
    h-full
    inline-block
    overflow-hidden
    cursor-pointer
    color-text-1
    col-span-12
    xs:col-span-6
    sm:col-span-4
    md:col-span-3
    lg:col-span-3
    @click.prevent="openCard($el)"
  >
    <div class="zy-store-style-card-inner">
      <div class="zy-card-title">
        <p>
          <slot name="title" />
        </p>
      </div>
      <div class="zy-card-image">
        <slot name="image" />
      </div>
    </div>
  </a>
</template>
<script setup lang="ts">
const router = useRouter();
const openCard = (element: any) => {
  const mainViewElement = document.querySelector(".main-view");
  let mainViewTop = 0;
  let mainViewLeft = 0;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  if (mainViewElement) {
    const view = mainViewElement.getBoundingClientRect();
    mainViewTop = view.top;
    mainViewLeft = view.left;
  }
  if (element) {
    // 预备动画
    element.classList.add("transition-prepare");

    // 正式动画
    setTimeout(() => {
      element.classList.remove("transition-prepare");
      setTimeout(() => {
        // 获取元素的位置
        const rect = element.getBoundingClientRect();
        // 复制一个绝对定位的卡片，制作动画
        const copyElement = element.cloneNode(true);
        copyElement.style.position = "fixed";
        copyElement.style.top = rect.top + "px";
        copyElement.style.left = rect.left + "px";
        copyElement.style.width = rect.width + "px";
        copyElement.style.height = rect.height + "px";
        copyElement.style.zIndex = "20";
        document.body.appendChild(copyElement);

        setTimeout(() => {
          copyElement.classList.add("transition-in");
          setTimeout(() => {
            copyElement.style.top = 0 + "px";
            copyElement.style.left = mainViewLeft + "px";
            copyElement.style.width = windowWidth - mainViewLeft + "px";
            copyElement.style.height = windowHeight + "px";
            const header = document.querySelector("header");
            if (header) {
              header.classList.remove("transition-translate-in");
              header.classList.add("transition-translate-out");
            }
            setTimeout(() => {
              let href = copyElement.href;
              let url = new URL(href);
              let path = url.pathname;
              router.replace(path);
              if (header) {
                header.classList.remove("transition-translate-out");
                header.classList.add("transition-translate-in");
              }
              // 动画结束，删除临时卡片
              document.body.removeChild(copyElement);
            }, 600);
          });
        }, 20);
      }, 100);
    }, 100);
  }
};
</script>

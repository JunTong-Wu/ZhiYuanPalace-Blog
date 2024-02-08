<template>
  <a
    class="zy-store-style-card"
    bg="bg-3"
    rounded-2xl
    w-full
    h-full
    inline-block
    overflow-hidden
    cursor-pointer
    color-text-1
    @click.prevent="openCard($el)"
  >
    <div class="zy-store-style-card-inner">
      <div class="zy-card-image">
        <slot name="image" />
        <div class="zy-card-title">
          <p>
            <slot name="title" />
          </p>
        </div>
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
    // 获取元素的位置
    const rect = element.getBoundingClientRect();
    // 输出元素的位置信息
    // console.log("Top position:", rect.top);
    // console.log("Right position:", rect.right);
    // console.log("Bottom position:", rect.bottom);
    // console.log("Left position:", rect.left);
    // console.log("Width:", rect.width);
    // console.log("Height:", rect.height);
    // 改变卡片定位
    element.style.position = "fixed";
    element.style.top = rect.top + "px";
    element.style.left = rect.left + "px";
    element.style.width = rect.width + "px";
    element.style.height = rect.height + "px";
    element.style.zIndex = "20";

    setTimeout(() => {
      element.classList.add("transition");
      setTimeout(() => {
        element.style.top = 0 + "px";
        element.style.left = mainViewLeft + "px";
        element.style.width = windowWidth - mainViewLeft + "px";
        element.style.height = windowHeight + "px";
        const header = document.querySelector("header");
        if (header) {
          header.classList.remove("transition-translate-in");
          header.classList.add("transition-translate-out");
        }
        setTimeout(() => {
          let href = element.href;
          let url = new URL(href);
          let path = url.pathname;
          router.replace(path);
          if (header) {
            header.classList.remove("transition-translate-out");
            header.classList.add("transition-translate-in");
          }
        }, 600);
      });
    });
  }
};
</script>

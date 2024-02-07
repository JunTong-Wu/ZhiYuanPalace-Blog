import type { add } from 'lodash';
<template>
  <div
    id="cardElement1"
    bg="bg-2"
    rounded-xl
    w-full
    h-full
    flex
    items-center
    justify-center
    @click="openCard()"
  >
    <div class="text">GO 1</div>
  </div>
</template>
<script setup lang="ts">
const goLink = `/article/1`;
const router = useRouter();
const openCard = () => {
  console.log(33333333);
  const element = document.getElementById("cardElement1");
  if (element) {
    // 获取元素的位置
    const rect = element.getBoundingClientRect();
    // 输出元素的位置信息
    console.log("Top position:", rect.top);
    console.log("Right position:", rect.right);
    console.log("Bottom position:", rect.bottom);
    console.log("Left position:", rect.left);
    console.log("Width:", rect.width);
    console.log("Height:", rect.height);
    // 改变卡片定位
    element.style.position = "fixed";
    element.style.top = rect.top + "px";
    element.style.left = rect.left + "px";
    element.style.width = rect.width + "px";
    element.style.height = rect.height + "px";
    element.style.zIndex = "100";
    element.classList.add("transition");
    // 添加过渡
    setTimeout(() => {
      element.style.transition = "all 400ms ease-in-out 0s";
      element.style.top = 0 + "px";
      element.style.left = 0 + "px";
      element.style.width = 100 + "vw";
      element.style.height = 100 + "vh";
      setTimeout(() => {
        element.style.background = "var(--bg-1)";
        setTimeout(() => {
          router.push(goLink);
        }, 500);
      }, 400);
    }, 4);
  }
};
onMounted(() => {});
</script>

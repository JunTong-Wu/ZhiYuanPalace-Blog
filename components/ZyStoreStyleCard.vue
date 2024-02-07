<template>
  <a
    class="zy-store-style-card"
    id="cardElement1"
    bg="bg-2"
    rounded-2xl
    w-full
    h-full
    flex
    items-center
    justify-center
    :href="goLink"
    @click.prevent="openCard()"
  >
    <div class="text">GO 1</div>
  </a>
</template>
<script setup lang="ts">
const goLink = `/article/1`;
const router = useRouter();
const openCard = () => {
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
  const element = document.getElementById("cardElement1");
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
    element.classList.add("transition");

    // 添加过渡
    setTimeout(() => {
      element.style.transition = "all 400ms ease-in-out 0s";
      element.style.top = 0 + "px";
      element.style.left = mainViewLeft + "px";
      element.style.width = windowWidth - mainViewLeft + "px";
      element.style.height = windowHeight + "px";
      element.style.borderRadius = "0";
      setTimeout(() => {
        router.push(goLink);
      }, 400);
    }, 4);
  }
};
onMounted(() => {});
</script>
<style scoped>
.zy-store-style-card {
  color: var(--text-1);
  cursor: pointer;
}
.zy-store-style-card.transition {
  /* box-shadow: 0 0 150px rgb(0 0 0 / 0.15) !important; */
}
</style>

import type { add } from 'lodash';
<template>
  <zy-link :to="goLink" h-full type="push">
    <div
      id="cardElement1"
      bg="bg-2"
      w-full
      h-full
      flex
      items-center
      justify-center
    >
      <div class="text">GO 1</div>
    </div>
  </zy-link>
</template>
<script setup lang="ts">
const { locale } = useI18n();
const goLink = `/${locale.value}/article/1`;
const router = useRouter();
// onMounted(() => {
//   router.beforeEach((to, from, next) => {
//     if (to.fullPath == goLink) {
//       const element = document.getElementById("cardElement1");
//       if (element) {
//         // 获取元素的位置
//         const rect = element.getBoundingClientRect();
//         // 输出元素的位置信息
//         // console.log("Top position:", rect.top);
//         // console.log("Right position:", rect.right);
//         // console.log("Bottom position:", rect.bottom);
//         // console.log("Left position:", rect.left);
//         // console.log("Width:", rect.width);
//         // console.log("Height:", rect.height);
//         // 改变卡片定位
//         element.style.position = "fixed";
//         element.style.top = rect.top + "px";
//         element.style.left = rect.left + "px";
//         element.style.width = rect.width + "px";
//         element.style.height = rect.height + "px";
//         element.style.zIndex = "100";
//         element.classList.add("transition");
//         // 添加过渡
//         setTimeout(() => {
//           element.style.transition = "all 400ms ease-in-out 0s";
//           element.style.top = 0 + "px";
//           element.style.left = 0 + "px";
//           element.style.width = 100 + "vw";
//           element.style.height = 100 + "vh";
//           setTimeout(() => {
//             element.style.background = "var(--bg-1)";
//             setTimeout(() => {
//               next();
//             }, 200);
//           }, 400);
//         }, 4);
//       }
//     } else {
//       next();
//     }
//   });
// });
</script>
<style scoped lang="scss">
.transition {
  .text {
    display: none;
  }
}
</style>

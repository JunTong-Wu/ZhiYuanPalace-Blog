<template>
  <div>
    <Header pl-sidebar />
    <main flex-1 pl-sidebar pt-header transition-padding bg="bg-transparent">
      <div
        text-base
        overflow-auto
        scroll-view
        class="main-view transition-in"
        p-4
      >
        <slot />
      </div>
    </main>
    <Footer class="vertical-layout" />
    <Sidebar class="horizontal-layout" />
  </div>
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";

// 过渡
const router = useRouter();
const { locale } = useI18n();
const check_loading = () => {
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(timer);
      document.querySelector(".main-view")?.classList.add("transition-in");
    }
  }, 100);
};
function isSwitchLanguagePage(toStr: string, fromStr: string) {
  const toParts = toStr.split("/");
  const fromParts = fromStr.split("/");
  let toRealPath = "";
  let fromRealPath = "";
  if (toParts.length > 2) {
    toRealPath = toParts.slice(2).join("/");
  }
  if (fromParts.length > 2) {
    fromRealPath = fromParts.slice(2).join("/");
  }
  if (toRealPath == fromRealPath) {
    return true;
  } else {
    return false;
  }
}
// router.beforeEach((to, from, next) => {
//   if (
//     to.fullPath.split("/").filter(Boolean).length <= 2 &&
//     from.fullPath.split("/").filter(Boolean).length <= 2
//   ) {
//     if (!isSwitchLanguagePage(to.fullPath, from.fullPath)) {
//       console.log(111111111111);
//       document.querySelector(".main-view")?.classList.remove("transition-in");
//       document.querySelector(".main-view")?.classList.add("transition-out");
//       setTimeout(() => {
//         document
//           .querySelector(".main-view")
//           ?.classList.remove("transition-out");
//         setTimeout(() => {
//           next();
//           check_loading();
//         }, 100);
//       }, 100);
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
</script>
<style lang="scss" scoped>
.main-view {
  position: relative;
  top: 100px;
  opacity: 0;
}
.main-view.transition-in {
  top: 0;
  opacity: 1;
  transition: top 200ms;
}
.main-view.transition-out {
  top: 0;
  opacity: 0;
  transition: opacity 100ms;
}
</style>

let count = 0;
export default defineNuxtRouteMiddleware((to, from) => {
  if (count >= 1) {
    if (process.client) {
      // 如果是客户端运行
      const mainView = document.querySelector(".main-view");
      if (mainView) {
        // 过渡效果
        mainView.classList.remove("transition-in");
        setTimeout(() => {
          mainView.classList.add("transition-in");
          // 滚动到顶部
          mainView.scrollTo({ top: 0, behavior: "smooth" });
        }, 40);
      }
    }
  } else {
    count++;
  }
});

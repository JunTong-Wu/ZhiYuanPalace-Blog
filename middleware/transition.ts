const isFirstLayer = (path: string) => {
  const parts = path.split("/");
  if (parts.length > 2) {
    return false;
  } else {
    return true;
  }
};
let count = 0;
export default defineNuxtRouteMiddleware((to, from) => {
  // 过渡效果
  if (count >= 1) {
    if (process.client) {
      if (isFirstLayer(from.fullPath) && isFirstLayer(to.fullPath)) {
        const mainView = document.querySelector(".main-view");
        if (mainView) {
          mainView.classList.remove("transition-in");
          setTimeout(() => {
            mainView.classList.add("transition-in");
            mainView.scrollTo({ top: 0, behavior: "smooth" });
          }, 40);
        }
      } else if (isFirstLayer(from.fullPath) && !isFirstLayer(to.fullPath)) {
        // const articleView = document.querySelector(".article-view");
        // if (articleView) {
        //   // console.log(22222);
        // }
        // return abortNavigation();
      }
    }
  } else {
    count++;
  }
});

const isFirstLayer = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  // 如果路径是"/"或者分割后的部分数量等于1，则返回true
  // 否则返回false
  return path === "/" || (parts.length === 1 && parts[0] !== "");
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
      } else if (!isFirstLayer(from.fullPath) && isFirstLayer(to.fullPath)) {
        const header = document.querySelector("header");
        if (header) {
          setTimeout(() => {
            header.classList.remove("transition-translate-out");
            header.classList.add("transition-translate-in");
          }, 400);
        }
        const mainView = document.querySelector(".main-view");
        if (mainView) {
          mainView.classList.remove("transition-in");
          setTimeout(() => {
            mainView.classList.add("transition-in");
            mainView.scrollTo({ top: 0, behavior: "smooth" });
          }, 40);
        }
      }
    }
  } else {
    count++;
  }
});

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
export default defineNuxtRouteMiddleware((to, from) => {
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
  if (isFirstLayer(from.fullPath) && isFirstLayer(to.fullPath)) {
    to.meta.pageTransition.name = "first-layer";
  }
  if (isFirstLayer(from.fullPath) && !isFirstLayer(to.fullPath)) {
    to.meta.pageTransition.name = "second-layer";
    to.meta.pageTransition.onAfterEnter = (el, done) => {
      const tempElement = document.getElementById("temp-element");
      if (tempElement) {
        document.body.removeChild(tempElement);
        const header = document.querySelector("header");
        if (header) {
          header.classList.remove("transition-translate-out");
          header.classList.add("transition-translate-in");
        }
      }
    };
  }
});

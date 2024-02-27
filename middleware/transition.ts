import NProgress from "nprogress";
import { headerBarHide, headerBarShow } from "@/transition/headerBar/headerBar";
import { footerBarHide, footerBarShow } from "@/transition/footerBar/footerBar";
import { cardTransitionEnd } from "@/transition/storeStyleCard/storeStyleCard";

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
  if (isFirstLayer(from.fullPath) && isFirstLayer(to.fullPath)) {
    to.meta.pageTransition.name = "first-layer";
    if (process.client) {
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      }, 100);
    }
  }
  if (isFirstLayer(from.fullPath) && !isFirstLayer(to.fullPath)) {
    to.meta.pageTransition.name = "second-layer";
    to.meta.pageTransition.onAfterEnter = (el, done) => {
      cardTransitionEnd();
      headerBarShow();
    };
  }
  if (!isFirstLayer(from.fullPath) && isFirstLayer(to.fullPath)) {
    headerBarHide();
    footerBarHide();
    to.meta.pageTransition.onEnter = (el, done) => {
      headerBarShow();
      footerBarShow();
    };
  }
});

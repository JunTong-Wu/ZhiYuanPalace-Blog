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

  if (path === "/" || (parts.length == 1 && parts[0] !== "")) {
    return 1;
  } else if (parts.length == 2 && parts[0] !== "") {
    return 2;
  } else {
    return 3;
  }
};
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 100);
  }
  if (isFirstLayer(from.fullPath) == 1 && isFirstLayer(to.fullPath) == 1) {
    from.meta.pageTransition.name = "first-layer";
    to.meta.pageTransition.name = "first-layer";
  }
  if (isFirstLayer(from.fullPath) == 1 && isFirstLayer(to.fullPath) == 2) {
    from.meta.pageTransition.name = "first-layer";
    to.meta.pageTransition.name = "first-layer";
  }
  if (isFirstLayer(from.fullPath) == 2 && isFirstLayer(to.fullPath) == 2) {
    if (from.meta.meta && to.meta.meta) {
      if ((from.meta.meta as any).order > (to.meta.meta as any).order) {
        from.meta.pageTransition.name = "second-layer-next";
        to.meta.pageTransition.name = "second-layer-prev";
      } else {
        from.meta.pageTransition.name = "second-layer-prev";
        to.meta.pageTransition.name = "second-layer-next";
      }
    }
  }
  if (isFirstLayer(from.fullPath) == 2 && isFirstLayer(to.fullPath) == 3) {
    from.meta.pageTransition.name = "third-layer";
    to.meta.pageTransition.name = "third-layer";
    to.meta.pageTransition.onAfterEnter = (el, done) => {
      cardTransitionEnd();
      headerBarShow();
    };
  }
  if (isFirstLayer(from.fullPath) == 3 && isFirstLayer(to.fullPath) == 2) {
    headerBarHide();
    footerBarHide();
    from.meta.pageTransition.name = "third-layer";
    to.meta.pageTransition.name = "second-layer-prev";
    to.meta.pageTransition.onEnter = (el, done) => {
      headerBarShow();
      footerBarShow();
    };
  }
  if (isFirstLayer(from.fullPath) == 2 && isFirstLayer(to.fullPath) == 1) {
    from.meta.pageTransition.name = "first-layer";
    to.meta.pageTransition.name = "first-layer";
  }
});

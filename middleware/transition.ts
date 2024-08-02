import NProgress from "nprogress";
import { headerBarHide, headerBarShow } from "@/transition/headerBar/headerBar";
import { footerBarHide, footerBarShow } from "@/transition/footerBar/footerBar";
import { musicBarHide, musicBarShow } from "@/transition/music/music";
import { toolBarHide, toolBarShow } from "@/transition/toolBar/toolBar";

export default defineNuxtRouteMiddleware((to, from) => {
  if (getPageLevel(from.fullPath) == 1 && getPageLevel(to.fullPath) == 1) {
    if (process.client) {
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      }, 100);
    }
    if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "first-layer-next";
        (to.meta.pageTransition as any).name = "first-layer-prev";
      }
    } else if (
      getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
    ) {
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "first-layer-prev";
        (to.meta.pageTransition as any).name = "first-layer-next";
      }
    }
  }
  if (
    (getPageLevel(from.fullPath) == 1 && getPageLevel(to.fullPath) == 2) ||
    (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 1)
  ) {
    if (process.client) {
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      }, 100);
    }
    if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "first-layer-next";
        (to.meta.pageTransition as any).name = "first-layer-prev";
      }
    } else if (
      getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
    ) {
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "first-layer-prev";
        (to.meta.pageTransition as any).name = "first-layer-next";
      }
    }
  }
  if (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 2) {
    if (process.client) {
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      }, 100);
    }
    if (getRootPath(from.fullPath) == getRootPath(to.fullPath)) {
      if (getSelfPathOrder(from.fullPath) > getSelfPathOrder(to.fullPath)) {
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = "second-layer-next";
          (to.meta.pageTransition as any).name = "second-layer-prev";
        }
      } else if (
        getSelfPathOrder(from.fullPath) < getSelfPathOrder(to.fullPath)
      ) {
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = "second-layer-prev";
          (to.meta.pageTransition as any).name = "second-layer-next";
        }
      }
    } else {
      if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = "first-layer-next";
          (to.meta.pageTransition as any).name = "first-layer-prev";
        }
      } else if (
        getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
      ) {
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = "first-layer-prev";
          (to.meta.pageTransition as any).name = "first-layer-next";
        }
      }
    }
  }
  if (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 3) {
    if (from.meta.pageTransition && to.meta.pageTransition) {
      (from.meta.pageTransition as any).name = "third-layer";
      (to.meta.pageTransition as any).name = "third-layer";
      (to.meta.pageTransition as any).onAfterEnter = () => {
        headerBarShow();
        musicBarShow();
        toolBarShow();
      };
    }
  }
  if (getPageLevel(from.fullPath) == 3 && getPageLevel(to.fullPath) == 2) {
    footerBarHide();
    headerBarHide();
    musicBarHide();
    toolBarHide();
    if (from.meta.pageTransition && to.meta.pageTransition) {
      (from.meta.pageTransition as any).name = "third-layer";
      (to.meta.pageTransition as any).name = "second-layer-prev";
      (to.meta.pageTransition as any).onEnter = () => {
        footerBarShow();
        headerBarShow();
        musicBarShow();
        toolBarShow();
      };
    }
  }
});

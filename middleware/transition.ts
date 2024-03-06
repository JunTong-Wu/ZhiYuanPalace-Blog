import NProgress from "nprogress";
import type { Route } from "@/models/menu/index";
import {
  getNavigationMap,
  getPageLevel,
  getRootPathOrder,
  getSelfPathOrder,
} from "@/models/menu/function";
import { headerBarHide, headerBarShow } from "@/transition/headerBar/headerBar";
import { footerBarHide, footerBarShow } from "@/transition/footerBar/footerBar";
import { musicBarHide, musicBarShow } from "@/transition/music/music";

const linkList = getNavigationMap() as Route[];

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
    if (
      getSelfPathOrder(linkList, from.fullPath) >
      getSelfPathOrder(linkList, to.fullPath)
    ) {
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "second-layer-next";
        (to.meta.pageTransition as any).name = "second-layer-prev";
      }
    } else if (
      getSelfPathOrder(linkList, from.fullPath) <
      getSelfPathOrder(linkList, to.fullPath)
    ) {
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "second-layer-prev";
        (to.meta.pageTransition as any).name = "second-layer-next";
      }
    }
  }
  if (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 3) {
    if (from.meta.pageTransition && to.meta.pageTransition) {
      (from.meta.pageTransition as any).name = "third-layer";
      (to.meta.pageTransition as any).name = "third-layer";
      (to.meta.pageTransition as any).onAfterEnter = () => {
        headerBarShow();
      };
    }
  }
  if (getPageLevel(from.fullPath) == 3 && getPageLevel(to.fullPath) == 2) {
    footerBarHide();
    headerBarHide();
    musicBarHide();
    if (from.meta.pageTransition && to.meta.pageTransition) {
      (from.meta.pageTransition as any).name = "third-layer";
      (to.meta.pageTransition as any).name = "second-layer-prev";
      (to.meta.pageTransition as any).onEnter = () => {
        footerBarShow();
        headerBarShow();
        musicBarShow();
      };
    }
  }
});

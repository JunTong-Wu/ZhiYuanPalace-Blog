import NProgress from "nprogress";
import { cardTransitionEnd as ArticleCardTransitionEnd } from "~/components/layout/ArticleCard/ArticleCard";
import { cardTransitionEnd as ShuoShuoCardTransitionEnd } from "~/components/layout/ShuoShuoCard/ShuoShuoCard";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = "auto";
    }
  }
  if (to.meta.layout === from.meta.layout) {
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
          footerColumnsShow();
          ArticleCardTransitionEnd();
          ShuoShuoCardTransitionEnd();
        };
      }
    }
    if (getPageLevel(from.fullPath) == 3 && getPageLevel(to.fullPath) == 2) {
      footerBarHide();
      footerColumnsHide();
      headerBarHide();
      musicBarHide();
      toolBarHide();
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "third-layer";
        (to.meta.pageTransition as any).name = "second-layer-prev";
        (to.meta.pageTransition as any).onEnter = () => {
          footerBarShow();
          footerColumnsShow();
          headerBarShow();
          musicBarShow();
          toolBarShow();
          ArticleCardTransitionEnd();
          ShuoShuoCardTransitionEnd();
        };
      }
    }
  }
  else {
    if (to.meta.layout === 'admin' && from.meta.layout === 'default') {
      live2dHide();
      if (from.meta.layoutTransition && to.meta.layoutTransition) {
        (from.meta.layoutTransition as any).name = "layout-prev";
        (to.meta.layoutTransition as any).name = "layout-next";
        (to.meta.pageTransition as any).onEnter = () => {

        };
      }
    }
    if (to.meta.layout === 'default' && from.meta.layout === 'admin') {
      live2dShow();
      if (from.meta.layoutTransition && to.meta.layoutTransition) {
        (from.meta.layoutTransition as any).name = "layout-next";
        (to.meta.layoutTransition as any).name = "layout-prev";
      }
    }
  }

});

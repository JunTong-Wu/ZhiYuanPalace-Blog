import NProgress from "nprogress";
import { cardTransitionEnd as ArticleCardTransitionEnd } from "~/components/layout/ArticleCard/transition";
import { cardTransitionEnd as ShuoShuoCardTransitionEnd } from "~/components/layout/ShuoShuoCard/transition";
import {
  footerBarHide,
  footerBarShow,
} from "~/components/layout/FooterNavigation/transition";
import {
  footerColumnsHide,
  footerColumnsShow,
} from "~/components/layout/FooterColumns/transition";
import {
  headerBarHide,
  headerBarShow,
} from "~/components/layout/Header/transition";
import {
  musicBarHide,
  musicBarShow,
} from "~/components/layout/Music/transition";
import {
  toolBarHide,
  toolBarShow,
} from "~/components/layout/Toolbar/transition";
import { live2dHide, live2dShow } from "~/components/layout/Live2D/transition";

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
    if (getPageLevel(from.fullPath) < 3 && getPageLevel(to.fullPath) == 3) {
      if (from.meta.pageTransition && to.meta.pageTransition) {
        (from.meta.pageTransition as any).name = "third-layer";
        (to.meta.pageTransition as any).name = "third-layer";
        (to.meta.pageTransition as any).onAfterEnter = () => {
          headerBarShow();
          musicBarShow();
          toolBarShow();
          footerColumnsShow();
          setTimeout(() => {
            ArticleCardTransitionEnd();
            ShuoShuoCardTransitionEnd();
          }, 200);
        };
      }
    }
    if (getPageLevel(from.fullPath) == 3 && getPageLevel(to.fullPath) < 3) {
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
          setTimeout(() => {
            ArticleCardTransitionEnd();
            ShuoShuoCardTransitionEnd();
          }, 200);
        };
      }
    }
  }

  // HeaderTitle
  const { clearPostInfo } = toRefs(store.usePostInfo());
  clearPostInfo.value();
});

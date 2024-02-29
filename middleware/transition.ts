import NProgress from "nprogress";
import { footerBarHide, footerBarShow } from "@/transition/footerBar/footerBar";
import { cardTransitionEnd } from "@/transition/storeStyleCard/storeStyleCard";

type Route = {
  path: string;
  title: string;
  defaultIcon?: string;
  activatedIcon?: string;
  order: number;
  children?: Route[];
};

const getPageLevel = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");
  if (path === "/") {
    return 1;
  } else {
    return parts.length;
  }
};

const getRootPathOrder = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  const rootPath = `/${parts[0]}`;
  const linkList = getNavigationMap() as Route[];
  for (const route of linkList) {
    if (route.path === rootPath) {
      return route.order;
    }
  }
  return 0;
};

const linkList = getNavigationMap() as Route[];

const getSelfPathOrder = (routes: Route[], path: string): number => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.path === path) {
        return route.order;
      }
    }
  }
  // 如果没有找到顶级路由匹配，则递归检查子路由
  for (const route of linkList) {
    if (route.children) {
      const result = getSelfPathOrder(route.children, path);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return 0;
};

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 100);
  }
  if (getPageLevel(from.fullPath) == 1 && getPageLevel(to.fullPath) == 1) {
    if (from.meta.meta && to.meta.meta) {
      if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
        from.meta.pageTransition.name = "first-layer-next";
        to.meta.pageTransition.name = "first-layer-prev";
      } else if (
        getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
      ) {
        from.meta.pageTransition.name = "first-layer-prev";
        to.meta.pageTransition.name = "first-layer-next";
      }
    }
  }
  if (
    (getPageLevel(from.fullPath) == 1 && getPageLevel(to.fullPath) == 2) ||
    (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 1)
  ) {
    if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
      from.meta.pageTransition.name = "first-layer-next";
      to.meta.pageTransition.name = "first-layer-prev";
    } else if (
      getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
    ) {
      from.meta.pageTransition.name = "first-layer-prev";
      to.meta.pageTransition.name = "first-layer-next";
    }
  }
  if (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 2) {
    if (
      getSelfPathOrder(linkList, from.fullPath) >
      getSelfPathOrder(linkList, to.fullPath)
    ) {
      from.meta.pageTransition.name = "second-layer-next";
      to.meta.pageTransition.name = "second-layer-prev";
    } else if (
      getSelfPathOrder(linkList, from.fullPath) <
      getSelfPathOrder(linkList, to.fullPath)
    ) {
      from.meta.pageTransition.name = "second-layer-prev";
      to.meta.pageTransition.name = "second-layer-next";
    }
  }
  if (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 3) {
    from.meta.pageTransition.name = "third-layer";
    to.meta.pageTransition.name = "third-layer";
    to.meta.pageTransition.onAfterEnter = (el, done) => {
      cardTransitionEnd();
    };
  }
  if (getPageLevel(from.fullPath) == 3 && getPageLevel(to.fullPath) == 2) {
    footerBarHide();
    from.meta.pageTransition.name = "third-layer";
    to.meta.pageTransition.name = "second-layer-prev";
    to.meta.pageTransition.onEnter = (el, done) => {
      footerBarShow();
    };
  }
});

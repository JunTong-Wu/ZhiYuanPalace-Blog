import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import { routersStringify } from "@/routers";

/**
 * 获取路由结构
 * @returns Array<RouteRecordRaw>
 */
export const _getNavigationMap = (): Array<RouteRecordRaw> => {
  // 深拷贝路由结构
  return JSON.parse(routersStringify);
};
/**
 * 获取访客路由结构
 * @returns Array<RouteRecordRaw>
 */
export const getVisitorNavigationMap = (): Array<RouteRecordRaw> => {
  let linkList = _getNavigationMap();
  linkList = linkList.filter((item) => item.meta?.rule !== "admin");
  return linkList;
};

/**
 * 获取管理员路由结构
 * @returns Array<RouteRecordRaw>
 */
export const getAdminNavigationMap = (): Array<RouteRecordRaw> => {
  let linkList = _getNavigationMap();
  linkList = linkList.filter((item) => item.meta?.rule === "admin");
  return linkList;
};

/**
 * 通过路径查找标题
 * @returns Array<RouteRecordRaw>
 */
export const _findTitleByPath = (
  routes: Array<RouteRecordRaw>,
  path: string
): string => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.path === path) {
        return (route.name as string) || "empty";
      }
    }
  }
  // 如果没有找到顶级路由匹配，则递归检查子路由
  for (const route of routes) {
    if (route.children) {
      const result = _findTitleByPath(route.children, path);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return "empty";
};

/**
 * 通过路径查找Order
 * @returns string
 */
export const _findOrderByPath = (
  routes: Array<RouteRecordRaw>,
  path: string
): number => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.path === path) {
        return (route.meta?.order as number) || 0;
      }
    }
  }
  //如果没有找到顶级路由匹配，则递归检查子路由
  for (const route of routes) {
    if (route.children) {
      const result = _findOrderByPath(route.children, path);
      if (result !== 0) {
        return result;
      }
    }
  }
  return 0;
};

/**
 * 获取自身路径Order
 * @returns number
 */
export const getSelfPathOrder = (path: string) => {
  let order = 0;
  const linkList = _getNavigationMap() as Array<RouteRecordRaw>;
  order = _findOrderByPath(linkList, path);
  return order;
};

/**
 * 获取访客导航列表
 * @returns Array<RouteRecordRaw>
 */
export const getNavigationMapForVisitorMenu = () => {
  let linkList = getVisitorNavigationMap();
  for (const route of linkList) {
    if (route.children && route.children[0]) {
      route.path = route.children[0].path;
    }
  }
  return linkList;
};

/**
 * 获取管理员导航列表
 * @returns Array<RouteRecordRaw>
 */
export const getNavigationMapForAdminMenu = () => {
  let linkList = getAdminNavigationMap();
  for (const route of linkList) {
    if (route.children && route.children[0]) {
      route.path = route.children[0].path;
    }
  }
  return linkList;
};

/**
 * 获取页面层级
 * @returns number
 */
export const getPageLevel = (path: string) => {
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

/**
 * 获取根路径
 * @returns string
 */
export const getRootPath = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  const rootPath = `/${parts[0]}`;
  const linkList = _getNavigationMap();
  for (const route of linkList) {
    if (route.path === rootPath) {
      return route.path;
    }
  }
  return "/";
};

/**
 * 删除含有:参数的路由
 * @returns Array<RouteRecordRaw>
 */
export const _removeIdRoute = (
  routes: Array<RouteRecordRaw>
): Array<RouteRecordRaw> => {
  const linkList = routes;
  const newLinkList = [] as any[];
  for (const routeItem of linkList) {
    if (!routeItem.children || !routeItem.children.length) {
      if (routeItem.path.includes(":")) {
        continue;
      } else {
        newLinkList.push(routeItem);
      }
    }
  }
  for (const routeItem of linkList) {
    if (routeItem.children) {
      for (const children of routeItem.children) {
        if (children.path.includes(":")) {
          continue;
        } else {
          const newRouteItem = _removeIdRoute(routeItem.children);
          newLinkList.push(newRouteItem);
        }
      }
    }
  }
  return newLinkList;
};

/**
 * 获取子路由
 * @returns Array<RouteRecordRaw>
 */
export const getChildrenTabs = (path: string) => {
  const linkList = _getNavigationMap();
  for (const routeItem of linkList) {
    if (!routeItem.children || !routeItem.children.length) {
      if (routeItem.path === path) {
        return [routeItem];
      }
    }
  }
  for (const routeItem of linkList) {
    if (routeItem.children) {
      for (const children of routeItem.children) {
        if (children.path == path) {
          return _removeIdRoute(routeItem.children);
        }
      }
    }
  }
};

/**
 * 获取根路径Order
 * @returns number
 */
export const getRootPathOrder = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  const rootPath = `/${parts[0]}`;
  const linkList = _getNavigationMap();
  for (const route of linkList) {
    if (route.path === rootPath) {
      return (route.meta?.order as number) || 0;
    }
  }
  return 0;
};

/**
 * 判断是否激活路由
 * @returns boolean
 */
export const isActivateRouter = (
  route: RouteLocationNormalizedLoaded,
  path: string
) => {
  if (path != "/") {
    if (getRootPath(route.fullPath) == getRootPath(path)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (route.path == "/") {
      return true;
    }
  }
};

/**
 * 判断是否是admin路由
 * @returns boolean
 */
export const isAdminRouter = (path: string) => {
  const linkList = _getNavigationMap();
  for (const route of linkList) {
    if (route.path === path) {
      if (route.meta?.rule === "admin") {
        return true;
      }
    }
  }
  return false;
};

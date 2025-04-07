import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
} from "vue-router";
import { routersStringify } from "@/routers";

/**
 * 获取路由结构
 * @returns Array<RouteRecordRaw>
 */
const _getNavigationMap = (): Array<RouteRecordRaw> => {
  // 深拷贝路由结构
  return JSON.parse(routersStringify);
};
/**
 * 获取访客路由结构
 * @returns Array<RouteRecordRaw>
 */
const getVisitorNavigationMap = (): Array<RouteRecordRaw> => {
  let linkList = _getNavigationMap();
  linkList = linkList.filter(
    (route) => route.meta?.type !== "admin" && route.meta?.type !== "doc",
  );
  return linkList;
};

/**
 * 获取管理员路由结构
 * @returns Array<RouteRecordRaw>
 */
const getAdminNavigationMap = (): Array<RouteRecordRaw> => {
  let linkList = _getNavigationMap();
  linkList = linkList.filter((route) => route.meta?.type === "admin");
  return linkList;
};

/**
 * 获取文档路由结构
 * @returns Array<RouteRecordRaw>
 */
const getDocNavigationMap = (): Array<RouteRecordRaw> => {
  let linkList = _getNavigationMap();
  linkList = linkList.filter((route) => route.meta?.type === "doc");
  return linkList;
};

/**
 * 导出方法：获取访客可导航列表
 * @returns Array<RouteRecordRaw>
 */
export const getNavigationMapForVisitorMenu = () => {
  let linkList = getVisitorNavigationMap();
  linkList = linkList.filter((route) => route.meta?.navigate === true);
  linkList.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.children = route.children.filter(
        (childrenRoute) => childrenRoute.meta?.navigate === true,
      );
    }
  });
  return linkList;
};

/**
 * 导出方法：获取管理员可导航列表
 * @returns Array<RouteRecordRaw>
 */
export const getNavigationMapForAdminMenu = () => {
  let linkList = getAdminNavigationMap();
  linkList = linkList.filter((route) => route.meta?.navigate === true);
  linkList.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.children = route.children.filter(
        (childrenRoute) => childrenRoute.meta?.navigate === true,
      );
    }
  });
  return linkList;
};

/**
 * 导出方法：获取文档可导航列表
 * @returns Array<RouteRecordRaw>
 */
export const getNavigationMapForDocMenu = () => {
  let linkList = getDocNavigationMap();
  linkList = linkList.filter((route) => route.meta?.navigate === true);
  linkList.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.children = route.children.filter(
        (childrenRoute) => childrenRoute.meta?.navigate === true,
      );
    }
  });
  return linkList;
};

/**
 * 通过名称查找图标
 * @returns
 */
const _findIconByName = (
  routes: Array<RouteRecordRaw>,
  name: string,
): {
  defaultIcon: string;
  activatedIcon: string;
} => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.name === name) {
        return {
          defaultIcon: route.meta?.defaultIcon as string,
          activatedIcon: route.meta?.activatedIcon as string,
        };
      }
    }
  }
  // 如果没有找到顶级路由匹配，则递归检查子路由
  for (const route of routes) {
    if (route.children) {
      const result = _findIconByName(route.children, name);
      if (result.defaultIcon !== "" && result.activatedIcon !== "") {
        return result;
      }
    }
  }
  return {
    defaultIcon: "",
    activatedIcon: "",
  };
};

/**
 * 导出方法：通过路由名称，获取自身图标
 * @returns
 */
export const getSelfIconByName = (name: string) => {
  let icon = {
    defaultIcon: "",
    activatedIcon: "",
  };
  const linkList = _getNavigationMap() as Array<RouteRecordRaw>;
  icon = _findIconByName(linkList, name);
  return icon;
};

/**
 * 导出方法：通过路由对象，获取自身Order
 * @returns number
 */
export const getSelfOrderByRoute = (route: RouteLocationNormalized) => {
  let order = 0;
  if (route.meta?.order) {
    order = route.meta?.order as number;
  }
  return order;
};

/**
 * 导出方法：通过路由对象，获取页面层级
 * @returns number
 */
export const getPageLevelByRoute = (route: RouteLocationNormalized) => {
  const path = route.fullPath;
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
 * 导出方法：通过路由对象，获取根路径
 * @returns string
 */
export const getRootPathByRoute = (route: RouteLocationNormalized) => {
  const path = route.fullPath;
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
 * 导出方法：通过路由对象，获取根路径Order
 * @returns number
 */
export const getRootOrderByRoute = (route: RouteLocationNormalized) => {
  const rootPath = getRootPathByRoute(route);
  const linkList = _getNavigationMap();
  for (const route of linkList) {
    if (route.path === rootPath) {
      return (route.meta?.order as number) || 0;
    }
  }
  return 0;
};

/**
 * 删除含有:参数的路由
 * @returns Array<RouteRecordRaw>
 */
const _removeIdRoute = (
  routes: Array<RouteRecordRaw>,
): Array<RouteRecordRaw> => {
  const linkList = routes;
  const newLinkList = [];
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
  return newLinkList as Array<RouteRecordRaw>;
};

/**
 * 导出方法：获取子路由的标签 (用于面包屑)
 * @returns Array<RouteRecordRaw> | null
 */
export const getChildrenTabs = (path: string): Array<RouteRecordRaw> | null => {
  const linkList = _getNavigationMap();
  for (const routeItem of linkList) {
    if (routeItem.children) {
      for (const children of routeItem.children) {
        if (children.path == path) {
          return _removeIdRoute(routeItem.children);
        }
      }
    }
  }
  return null;
};

/**
 * 导出方法：判断是否是激活路由的根路由
 * @returns boolean
 */
export const isActivateRootRouter = (
  route: RouteLocationNormalizedLoaded,
  path: string,
) => {
  if (route.path != "/" && route.path != "/admin" && route.path != "/doc") {
    if (
      path != "/" &&
      path != "/admin" &&
      path != "/doc" &&
      route.path.includes(path)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (path === route.path) {
      return true;
    }
  }
};

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
  linkList = linkList.filter(
    (item) => item.meta?.role !== "admin" && item.meta?.navigate !== false,
  );
  return linkList;
};

/**
 * 获取管理员路由结构
 * @returns Array<RouteRecordRaw>
 */
export const getAdminNavigationMap = (): Array<RouteRecordRaw> => {
  let linkList = _getNavigationMap();
  linkList = linkList.filter(
    (item) => item.meta?.role === "admin" && item.meta?.navigate !== false,
  );
  return linkList;
};

/**
 * 获取访客可导航列表
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
 * 获取管理员可导航列表
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
 * 通过路径查找标题
 * @returns string
 */
export const _findTitleByPath = (
  routes: Array<RouteRecordRaw>,
  path: string,
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
      if (result !== "empty") {
        return result;
      }
    }
  }
  return "empty";
};

/**
 * 获取自身路径标题
 * @returns string
 */
export const getSelfTitle = (path: string) => {
  let title = "empty";
  const linkList = _getNavigationMap() as Array<RouteRecordRaw>;
  title = _findTitleByPath(linkList, path);
  return title;
};

/**
 * 通过路径查找图标
 * @returns
 */
export const _findIconByPath = (
  routes: Array<RouteRecordRaw>,
  path: string,
): {
  defaultIcon: string;
  activatedIcon: string;
} => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.path === path) {
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
      const result = _findIconByPath(route.children, path);
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
 * 获取自身路径图标
 * @returns
 */
export const getSelfIcon = (path: string) => {
  let icon = {
    defaultIcon: "",
    activatedIcon: "",
  };
  const linkList = _getNavigationMap() as Array<RouteRecordRaw>;
  icon = _findIconByPath(linkList, path);
  return icon;
};

/**
 * 通过路径查找Order
 * @returns string
 */
export const _findOrderByPath = (
  routes: Array<RouteRecordRaw>,
  path: string,
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
export const getSelfOrder = (path: string) => {
  let order = 0;
  const linkList = _getNavigationMap() as Array<RouteRecordRaw>;
  order = _findOrderByPath(linkList, path);
  return order;
};

/**
 * 通过路径查找Role
 * @returns string
 */
export const _findRoleByPath = (
  routes: Array<RouteRecordRaw>,
  path: string,
): string => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.path === path) {
        return (route.meta?.role as string) || "";
      }
    }
  }
  //如果没有找到顶级路由匹配，则递归检查子路由
  for (const route of routes) {
    if (route.children) {
      const result = _findRoleByPath(route.children, path);
      if (result !== "") {
        return result;
      }
    }
  }
  return "";
};

/**
 * 判断是否是admin路由
 * @returns boolean
 */
export const isAdminRouter = (path: string) => {
  let role = "";
  const linkList = _getNavigationMap() as Array<RouteRecordRaw>;
  role = _findRoleByPath(linkList, path);
  if (role === "admin") {
    return true;
  } else {
    // 如果路由表没有写，则可能是用户输入错误，尝试从URL字符串判断
    if (role === "" && getRootPath(path) === "/admin") {
      return true;
    }
    return false;
  }
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
 * 获取根路径Order
 * @returns number
 */
export const getRootPathOrder = (path: string) => {
  const rootPath = getRootPath(path);
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
export const _removeIdRoute = (
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
 * 判断是否是激活路由
 * @returns boolean
 */
export const isActivateRouter = (
  route: RouteLocationNormalizedLoaded,
  path: string,
) => {
  if (route.fullPath == path) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断是否是激活路由的根路由
 * @returns boolean
 */
export const isActivateRootRouter = (
  route: RouteLocationNormalizedLoaded,
  path: string,
) => {
  if (path != "/" && route.path != "/admin") {
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

import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { Route } from "./type";

export const getNavigationMap = (): Route[] => {
  return [
    {
      path: "/",
      title: "home",
      defaultIcon: "home-default",
      activatedIcon: "home-activated",
      iconImage: "home",
      order: 1,
    },
    {
      path: "/text",
      title: "text",
      defaultIcon: "text-default",
      activatedIcon: "text-activated",
      iconImage: "text",
      order: 2,
      children: [
        {
          path: "/text/article",
          title: "article",
          defaultIcon: "article-default",
          activatedIcon: "article-activated",
          order: 10,
        },
        {
          path: "/text/shuoshuo",
          title: "shuoshuo",
          defaultIcon: "shuoshuo-default",
          activatedIcon: "shuoshuo-activated",
          order: 20,
        },
      ],
    },
    {
      path: "/music",
      title: "music",
      defaultIcon: "music-default",
      activatedIcon: "music-activated",
      iconImage: "music",
      order: 3,
    },
    {
      path: "/audio",
      title: "audio",
      defaultIcon: "audio-default",
      activatedIcon: "audio-activated",
      iconImage: "audio",
      order: 4,
      children: [
        {
          path: "/audio/photo",
          title: "photo",
          defaultIcon: "photo-default",
          activatedIcon: "photo-activated",
          order: 30,
        },
        {
          path: "/audio/video",
          title: "video",
          defaultIcon: "video-default",
          activatedIcon: "video-activated",
          order: 40,
        },
      ],
    },
    {
      path: "/about",
      title: "about",
      defaultIcon: "about-default",
      activatedIcon: "about-activated",
      iconImage: "about",
      order: 5,
      children: [
        {
          path: "/about/information",
          title: "information",
          defaultIcon: "information-default",
          activatedIcon: "information-activated",
          order: 50,
        },
        {
          path: "/about/friend",
          title: "friend",
          defaultIcon: "friend-default",
          activatedIcon: "friend-activated",
          order: 60,
        },
      ],
    },
  ];
};

export const findTitleByPath = (routes: Route[], path: string): string => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.path === path) {
        return route.title;
      }
    }
  }
  // 如果没有找到顶级路由匹配，则递归检查子路由
  for (const route of routes) {
    if (route.children) {
      const result = findTitleByPath(route.children, path);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return "empty";
};

export const getMobileTitle = (path: string) => {
  let title = "empty";
  const linkList = getNavigationMap() as Route[];
  title = findTitleByPath(linkList, path);
  return title;
};

export const findOrderByPath = (routes: Route[], path: string): number => {
  // 首先检查顶级路由
  for (const route of routes) {
    if (!route.children || !route.children.length) {
      if (route.path === path) {
        return route.order;
      }
    }
  }
  //如果没有找到顶级路由匹配，则递归检查子路由
  for (const route of routes) {
    if (route.children) {
      const result = findOrderByPath(route.children, path);
      if (result !== 0) {
        return result;
      }
    }
  }
  return 0;
};

export const getSelfPathOrder = (path: string) => {
  let order = 0;
  const linkList = getNavigationMap() as Route[];
  order = findOrderByPath(linkList, path);
  return order;
};

export const getNavigationMapForMenu = () => {
  let linkList = getNavigationMap() as Route[];
  for (const route of linkList) {
    if (route.children) {
      route.path = route.children[0].path;
    }
  }
  return linkList;
};

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

export const getRootPath = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  const rootPath = `/${parts[0]}`;
  const linkList = getNavigationMap() as Route[];
  for (const route of linkList) {
    if (route.path === rootPath) {
      return route.path;
    }
  }
  return "/";
};

export const getChildrenTabs = (path: string) => {
  const linkList = getNavigationMap() as Route[];
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
          return routeItem.children;
        }
      }
    }
  }
};

export const getRootPathOrder = (path: string) => {
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

export const routerActivate = (
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

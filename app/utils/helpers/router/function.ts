import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { Route } from "./type";

export const getNavigationMap = (): Route[] => {
  return [
    {
      path: "/",
      title: "home",
      defaultIcon: "i-fluent-home-16-regular",
      activatedIcon: "i-fluent-home-16-filled",
      iconImage: "home",
      order: 1,
    },
    {
      path: "/text",
      title: "text",
      defaultIcon: "i-fluent-textbox-16-regular",
      activatedIcon: "i-fluent-textbox-16-filled",
      iconImage: "text",
      order: 2,
      children: [
        {
          path: "/text/article",
          title: "article",
          defaultIcon: "i-fluent-document-text-16-regular",
          activatedIcon: "i-fluent-document-text-16-filled",
          order: 201,
        },
        {
          path: "/text/shuoshuo",
          title: "shuoshuo",
          defaultIcon: "i-fluent-text-quote-16-regular",
          activatedIcon: "i-fluent-text-quote-16-filled",
          order: 202,
        },
      ],
    },
    {
      path: "/music",
      title: "music",
      defaultIcon: "i-fluent-music-note-2-16-regular",
      activatedIcon: "i-fluent-music-note-2-16-filled",
      iconImage: "music",
      order: 3,
    },
    {
      path: "/audio",
      title: "audio",
      defaultIcon: "i-fluent-video-clip-16-regular",
      activatedIcon: "i-fluent-video-clip-16-filled",
      iconImage: "audio",
      order: 4,
      children: [
        {
          path: "/audio/photo",
          title: "photo",
          defaultIcon: "i-fluent-camera-16-regular",
          activatedIcon: "i-fluent-camera-16-filled",
          order: 401,
        },
        {
          path: "/audio/video",
          title: "video",
          defaultIcon: "i-fluent-video-16-regular",
          activatedIcon: "i-fluent-video-16-filled",
          order: 402,
        },
      ],
    },
    {
      path: "/about",
      title: "about",
      defaultIcon: "i-fluent-person-16-regular",
      activatedIcon: "i-fluent-person-16-filled",
      iconImage: "about",
      order: 5,
      children: [
        {
          path: "/about/information",
          title: "information",
          defaultIcon: "i-fluent-contact-card-16-regular",
          activatedIcon: "i-fluent-contact-card-16-filled",
          order: 501,
        },
        {
          path: "/about/friend",
          title: "friend",
          defaultIcon: "i-fluent-link-multiple-16-regular",
          activatedIcon: "i-fluent-link-multiple-16-filled",
          order: 502,
        },
      ],
    },
    {
      path: "/admin",
      title: "admin",
      defaultIcon: "admin-default",
      activatedIcon: "admin-activated",
      order: 6,
      rule: "admin",
    },
  ];
};

export const getVisitorNavigationMap = (): Route[] => {
  let linkList = getNavigationMap() as Route[];
  linkList = linkList.filter((item) => item.rule !== "admin");
  return linkList;
};

export const getAdminNavigationMap = (): Route[] => {
  let linkList = getNavigationMap() as Route[];
  linkList = linkList.filter((item) => item.rule === "admin");
  return linkList;
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

export const getNavigationMapForVisitorMenu = () => {
  let linkList = getVisitorNavigationMap() as Route[];
  for (const route of linkList) {
    if (route.children) {
      route.path = route.children[0].path;
    }
  }
  return linkList;
};

export const getNavigationMapForAdminMenu = () => {
  let linkList = getAdminNavigationMap() as Route[];
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

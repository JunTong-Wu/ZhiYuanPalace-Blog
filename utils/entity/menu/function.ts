import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { Route } from "./common";

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

export const getSvgByName = (name: string) => {
  let svgElement = "";
  switch (name) {
    case "close":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg>`;
      break;
    case "search":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.98 6.98 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.98 6.98 0 0 0 4.875-1.975z"/></svg>`;
      break;
    case "maximize":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M4 3.5a.5.5 0 0 0-.5.5v1.614a.75.75 0 0 1-1.5 0V4a2 2 0 0 1 2-2h1.614a.75.75 0 0 1 0 1.5zm5.636-.75a.75.75 0 0 1 .75-.75H12a2 2 0 0 1 2 2v1.614a.75.75 0 0 1-1.5 0V4a.5.5 0 0 0-.5-.5h-1.614a.75.75 0 0 1-.75-.75M2.75 9.636a.75.75 0 0 1 .75.75V12a.5.5 0 0 0 .5.5h1.614a.75.75 0 0 1 0 1.5H4a2 2 0 0 1-2-2v-1.614a.75.75 0 0 1 .75-.75m10.5 0a.75.75 0 0 1 .75.75V12a2 2 0 0 1-2 2h-1.614a.75.75 0 1 1 0-1.5H12a.5.5 0 0 0 .5-.5v-1.614a.75.75 0 0 1 .75-.75"/></svg>`;
      break;
    case "minimize":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M11.5 4a.5.5 0 0 0 .5.5h1.75a.75.75 0 0 1 0 1.5H12a2 2 0 0 1-2-2V2.25a.75.75 0 0 1 1.5 0zm0 8a.5.5 0 0 1 .5-.5h1.75a.75.75 0 0 0 0-1.5H12a2 2 0 0 0-2 2v1.75a.75.75 0 0 0 1.5 0zM4 11.5a.5.5 0 0 1 .5.5v1.75a.75.75 0 0 0 1.5 0V12a2 2 0 0 0-2-2H2.25a.75.75 0 0 0 0 1.5zM4.5 4a.5.5 0 0 1-.5.5H2.25a.75.75 0 0 0 0 1.5H4a2 2 0 0 0 2-2V2.25a.75.75 0 0 0-1.5 0z"/></svg>`;
      break;
    case "language":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.235 6.453a8 8 0 0 0 8.817 12.944c.115-.75-.137-1.47-.24-1.722c-.23-.56-.988-1.517-2.253-2.844c-.338-.355-.316-.627-.195-1.437l.013-.091c.082-.554.22-.882 2.085-1.178c.948-.15 1.197.228 1.542.753l.116.172c.328.48.571.59.938.756c.165.075.37.17.645.325c.652.373.652.794.652 1.716v.105c0 .391-.038.735-.098 1.034a8.002 8.002 0 0 0-3.105-12.341c-.553.373-1.312.902-1.577 1.265c-.135.185-.327 1.132-.95 1.21c-.162.02-.381.006-.613-.009c-.622-.04-1.472-.095-1.744.644c-.173.468-.203 1.74.356 2.4c.09.105.107.3.046.519c-.08.287-.241.462-.292.498c-.096-.056-.288-.279-.419-.43c-.313-.366-.705-.82-1.211-.96c-.184-.051-.386-.093-.583-.135c-.549-.115-1.17-.246-1.315-.554c-.106-.226-.105-.537-.105-.865c0-.417 0-.888-.204-1.345a1.3 1.3 0 0 0-.306-.43M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"/></svg>`;
      break;
    case "sun":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8M11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z"/></svg>`;
      break;
    case "moon":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7m-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938A8 8 0 0 0 4 12"/></svg>`;
      break;
    case "more":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M9.513 14.18Q8.5 15.193 8.5 16.625t1.013 2.445q1.013 1.013 2.445 1.013 1.433 0 2.446-1.013 1.013-1.013 1.013-2.445t-1.013-2.445q-1.013-1.013-2.446-1.013-1.432 0-2.445 1.013Zm1.355 3.535q-.451-.451-.451-1.09t.451-1.09q.452-.452 1.09-.452.639 0 1.09.452.452.451.452 1.09t-.452 1.09q-.451.452-1.09.452-.638 0-1.09-.452ZM9.513 5.013Q8.5 6.026 8.5 7.458q0 1.433 1.013 2.446 1.013 1.013 2.445 1.013 1.433 0 2.446-1.013 1.013-1.013 1.013-2.446 0-1.432-1.013-2.445T11.958 4q-1.432 0-2.445 1.013Zm1.355 3.535q-.451-.451-.451-1.09 0-.638.451-1.09.452-.451 1.09-.451.639 0 1.09.451.452.452.452 1.09 0 .639-.452 1.09-.451.452-1.09.452-.638 0-1.09-.452Z" fill="currentColor"></path></svg>`;
      break;
    case "home-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3.918 8.037A9 9 0 0 0 15.966 20.08c.873.373 1.719.618 2.49.681c.902.074 1.844-.095 2.526-.777c.752-.752.88-1.816.746-2.812c-.123-.91-.48-1.92-1.002-2.961A9 9 0 0 0 9.791 3.274c-1.044-.524-2.055-.882-2.965-1.006c-.997-.135-2.062-.007-2.815.746c-.682.683-.851 1.626-.777 2.528c.064.773.31 1.62.684 2.495m1.404-2.071a4 4 0 0 1-.095-.587c-.048-.586.09-.842.198-.95c.12-.12.423-.275 1.132-.179q.298.04.643.136a9 9 0 0 0-1.878 1.58m14.29 10.837a5 5 0 0 1 .134.637c.096.709-.06 1.012-.178 1.13c-.109.109-.364.247-.95.199a4 4 0 0 1-.581-.094a9 9 0 0 0 1.575-1.872m-3.73 1.023c-1.677-.878-3.625-2.323-5.507-4.205c-1.88-1.88-3.324-3.825-4.203-5.5A7.02 7.02 0 0 1 9.97 5.298a7 7 0 0 1 5.912 12.528m-2.277.99a7 7 0 0 1-8.42-8.419c.964 1.516 2.25 3.112 3.776 4.638c1.528 1.528 3.126 2.815 4.644 3.78"/></svg>`;
      break;
    case "home-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.322 5.966A9.2 9.2 0 0 1 7.2 4.386a4.5 4.5 0 0 0-.844-.157c-.572-.043-.823.093-.93.2c-.106.106-.242.357-.2.93q.022.275.097.607m15.404 8.245q.091.184.177.366c.476 1.02.791 2.017.859 2.913c.067.892-.106 1.82-.78 2.495c-.674.674-1.603.847-2.495.78c-.78-.06-1.637-.306-2.52-.684l-.003.002a13 13 0 0 1-.462-.208c-2.033-.963-4.359-2.654-6.542-4.838c-2.181-2.181-3.872-4.505-4.835-6.536q-.11-.233-.209-.463l.001-.002c-.379-.885-.626-1.745-.685-2.527c-.068-.892.105-1.82.78-2.495c.673-.674 1.602-.847 2.494-.78c.896.068 1.892.383 2.913.86q.186.085.373.18a9 9 0 0 1 8.572 2.362a9 9 0 0 1 2.362 8.575m-1.113 2.593a9 9 0 0 1-1.576 1.871q.328.075.6.095c.573.043.824-.093.93-.2c.108-.106.244-.357.2-.93a4.5 4.5 0 0 0-.154-.836m-13.977 1.56a9 9 0 0 1-2.417-8.342c1.082 1.981 2.705 4.1 4.68 6.076c1.977 1.977 4.098 3.6 6.08 4.683a9 9 0 0 1-8.343-2.417"/></svg>`;
      break;
    case "text-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18H6a1 1 0 1 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16zM5 16.05q.243-.05.5-.05H19V4H5zM16 9H8V7h8z"/></svg>`;
      break;
    case "text-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18H6a1 1 0 1 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16zm-5-9V7H8v2z"/></svg>`;
      break;
    case "music-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 3v14a4 4 0 1 1-2-3.465V5H9v12a4 4 0 1 1-2-3.465V3zM5 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4m11 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></svg>`;
      break;
    case "music-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 3v14a4 4 0 1 1-2-3.465V6H9v11a4 4 0 1 1-2-3.465V3z"/></svg>`;
      break;
    case "audio-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m9.828 5l-2 2H4v12h16V7h-3.828l-2-2zM9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm3 15a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11m0-2a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"/></svg>`;
      break;
    case "audio-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm3 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0-2a4 4 0 1 1 0-8a4 4 0 0 1 0 8"/></svg>`;
      break;
    case "about-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/></svg>`;
      break;
    case "about-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12"/></svg>`;
      break;
    case "arrow-left":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 5l-6 7l6 7"/></svg>`;
      break;
    case "music-play":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M4.496 1.994A1 1 0 0 0 3 2.862v6.277a1 1 0 0 0 1.496.868l5.492-3.139a1 1 0 0 0 0-1.736z"/></svg>`;
      break;
    case "music-list":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 18h10v2H2zm0-7h14v2H2zm0-7h20v2H2zm17 11.17V9h5v2h-3v7a3 3 0 1 1-2-2.83"/></svg>`;
      break;
    case "music-prev":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M14 3.002a1 1 0 0 0-1.578-.816l-7 4.963a1 1 0 0 0-.007 1.628l7 5.037A1 1 0 0 0 14 13.003zM2 2.5a.5.5 0 0 1 1 0v11a.5.5 0 0 1-1 0z"/></svg>`;
      break;
    case "music-next":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M2 3.002a1 1 0 0 1 1.578-.816l7 4.963a1 1 0 0 1 .007 1.628l-7 5.037A1 1 0 0 1 2 13.003zM14 2.5a.5.5 0 1 0-1 0v11a.5.5 0 0 0 1 0z"/></svg>`;
      break;

    default:
      break;
  }
  return svgElement;
};

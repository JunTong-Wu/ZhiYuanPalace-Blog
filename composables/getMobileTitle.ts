type Route = {
  path: string;
  title: string;
  defaultIcon?: string;
  activatedIcon?: string;
  order: number;
  children?: Route[];
};
const findTitleByPath = (routes: Route[], path: string): string => {
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

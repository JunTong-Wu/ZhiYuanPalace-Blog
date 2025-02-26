// API(router): https://nuxt.com/docs/api/configuration/nuxt-config
import type { RouterOptions } from "vue-router";
import type { RouterConfig } from "@nuxt/schema";
import type { RouteMeta } from "vue-router";
import routes from "./routers";

// 重写的路由
const customRoutes: RouterOptions["routes"] = routes;

const _addMetaRecursively = (
  route: RouterOptions["routes"][number],
  commonMeta: RouteMeta,
): void => {
  route.meta = { ...commonMeta, ...route.meta };
  if (route.children) {
    route.children.forEach((childRoute) => {
      _addMetaRecursively(childRoute, commonMeta);
    });
  }
};

export default {
  routes: (nuxtRoutes: RouterOptions["routes"]) => {
    // 对路由数据进行过滤处理，返回一个新的路由数据数组，只保留自定义路由数据，清空Nuxt原有的路由数据
    const myRotes = nuxtRoutes.slice(0, 0).concat(customRoutes);
    //统一添加通用meta
    const commonMeta: RouteMeta = {
      pageTransition: {
        mode: "out-in",
      },
      middleware: ["auth", "transition"],
    };
    myRotes.forEach((route) => {
      _addMetaRecursively(route, commonMeta);
    });
    // 返回新的路由数据数组
    return myRotes;
  },
} satisfies RouterConfig;

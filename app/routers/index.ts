// @ts-nocheck
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
    meta: {
      navigate: false,
      order: 0,
    },
  },
  {
    path: "/", // 路由的路径
    name: "home", // 路由的名称
    component: () => import("@/pages/visitor/index.vue"), // 路由的组件
    meta: {
      navigate: true, // 路由是否可以被导航
      defaultIcon: "i-fluent-home-16-regular", // 路由的默认图标
      activatedIcon: "i-fluent-home-16-filled", // 路由的激活图标
      order: 100, // 路由的排序
    },
  },
  {
    path: "/text",
    name: "text",
    component: () => import("@/pages/visitor/text/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-textbox-16-regular",
      activatedIcon: "i-fluent-textbox-16-filled",
      order: 200,
    },
    children: [
      {
        path: "/text/article",
        name: "article",
        component: () => import("@/pages/visitor/text/article/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-document-text-16-regular",
          activatedIcon: "i-fluent-document-text-16-filled",
          order: 210,
        },
      },
      {
        path: "/text/article/:id",
        name: "article-id",
        component: () => import("@/pages/visitor/text/article/[id].vue"),
        meta: {
          order: 211,
        },
      },
      {
        path: "/text/shuoshuo",
        name: "shuoshuo",
        component: () => import("@/pages/visitor/text/shuoshuo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-text-quote-16-regular",
          activatedIcon: "i-fluent-text-quote-16-filled",
          order: 220,
        },
      },
      {
        path: "/text/shuoshuo/:id",
        name: "shuoshuo-id",
        component: () => import("@/pages/visitor/text/shuoshuo/[id].vue"),
        meta: {
          order: 221,
        },
      },
    ],
  },
  {
    path: "/music",
    name: "music",
    component: () => import("@/pages/visitor/music/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-music-note-2-16-regular",
      activatedIcon: "i-fluent-music-note-2-16-filled",
      order: 300,
    },
  },
  {
    path: "/audio",
    name: "audio",
    component: () => import("@/pages/visitor/audio/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-video-clip-16-regular",
      activatedIcon: "i-fluent-video-clip-16-filled",
      order: 400,
    },
    children: [
      {
        path: "/audio/photo",
        name: "photo",
        component: () => import("@/pages/visitor/audio/photo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-image-16-regular",
          activatedIcon: "i-fluent-image-16-filled",
          order: 410,
        },
      },
      {
        path: "/audio/photo/:album",
        name: "photo-album",
        component: () =>
          import("@/pages/visitor/audio/photo/[album]/index.vue"),
        meta: {
          order: 411,
        },
      },
      {
        path: "/audio/video",
        name: "video",
        component: () => import("@/pages/visitor/audio/video/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-video-16-regular",
          activatedIcon: "i-fluent-video-16-filled",
          order: 420,
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/visitor/about/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-info-16-regular",
      activatedIcon: "i-fluent-info-16-filled",
      order: 500,
    },
    children: [
      {
        path: "/about/information",
        name: "information",
        component: () => import("@/pages/visitor/about/information/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-person-16-regular",
          activatedIcon: "i-fluent-person-16-filled",
          order: 510,
        },
      },
      {
        path: "/about/friend",
        name: "friend",
        component: () => import("@/pages/visitor/about/friend/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-person-16-regular",
          activatedIcon: "i-fluent-person-16-filled",
          order: 520,
        },
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/pages/admin/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-settings-16-regular",
      activatedIcon: "i-fluent-settings-16-filled",
      order: 600,
      role: "admin",
    },
  },
];

export const routersStringify = JSON.stringify(routes);

export default routes;

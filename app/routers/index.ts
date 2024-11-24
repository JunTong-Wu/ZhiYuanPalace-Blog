import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/", // 路由的路径
    name: "home", // 路由的名称
    // @ts-ignore
    component: () => import("@/pages/index.vue"), // 路由的组件
    meta: {
      defaultIcon: "i-fluent-home-16-regular", // 路由的默认图标
      activatedIcon: "i-fluent-home-16-filled", // 路由的激活图标
      order: 100, // 路由的排序
    },
  },
  {
    path: "/text",
    name: "text",
    // @ts-ignore
    component: () => import("@/pages/text/index.vue"),
    meta: {
      defaultIcon: "i-fluent-textbox-16-regular",
      activatedIcon: "i-fluent-textbox-16-filled",
      order: 200,
    },
    children: [
      {
        path: "/text/article",
        name: "article",
        // @ts-ignore
        component: () => import("@/pages/text/article/index.vue"),
        meta: {
          defaultIcon: "i-fluent-document-text-16-regular",
          activatedIcon: "i-fluent-document-text-16-filled",
          order: 210,
        },
      },
      {
        path: "/text/article/:id",
        name: "article-id",
        // @ts-ignore
        component: () => import("@/pages/text/article/[id].vue"),
        meta: {
          order: 211,
        },
      },
      {
        path: "/text/shuoshuo",
        name: "shuoshuo",
        // @ts-ignore
        component: () => import("@/pages/text/shuoshuo/index.vue"),
        meta: {
          defaultIcon: "i-fluent-text-quote-16-regular",
          activatedIcon: "i-fluent-text-quote-16-filled",
          order: 220,
        },
      },
      {
        path: "/text/shuoshuo/:id",
        name: "shuoshuo-id",
        // @ts-ignore
        component: () => import("@/pages/text/shuoshuo/[id].vue"),
        meta: {
          order: 221,
        },
      },
    ],
  },
  {
    path: "/music",
    name: "music",
    // @ts-ignore
    component: () => import("@/pages/music/index.vue"),
    meta: {
      defaultIcon: "i-fluent-music-note-2-16-regular",
      activatedIcon: "i-fluent-music-note-2-16-filled",
      order: 300,
    },
  },
  {
    path: "/audio",
    name: "audio",
    // @ts-ignore
    component: () => import("@/pages/audio/index.vue"),
    meta: {
      defaultIcon: "i-fluent-video-clip-16-regular",
      activatedIcon: "i-fluent-video-clip-16-filled",
      order: 400,
    },
    children: [
      {
        path: "/audio/photo",
        name: "photo",
        // @ts-ignore
        component: () => import("@/pages/audio/photo/index.vue"),
        meta: {
          defaultIcon: "i-fluent-image-16-regular",
          activatedIcon: "i-fluent-image-16-filled",
          order: 410,
        },
      },
      {
        path: "/audio/photo/:album",
        name: "photo-album",
        // @ts-ignore
        component: () => import("@/pages/audio/photo/[album]/index.vue"),
        meta: {
          order: 411,
        },
      },
      {
        path: "/audio/video",
        name: "video",
        // @ts-ignore
        component: () => import("@/pages/audio/video/index.vue"),
        meta: {
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
    // @ts-ignore
    component: () => import("@/pages/about/index.vue"),
    meta: {
      defaultIcon: "i-fluent-info-16-regular",
      activatedIcon: "i-fluent-info-16-filled",
      order: 500,
    },
    children: [
      {
        path: "/about/information",
        name: "information",
        // @ts-ignore
        component: () => import("@/pages/about/information/index.vue"),
        meta: {
          defaultIcon: "i-fluent-person-16-regular",
          activatedIcon: "i-fluent-person-16-filled",
          order: 510,
        },
      },
      {
        path: "/about/friend",
        name: "friend",
        // @ts-ignore
        component: () => import("@/pages/about/friend/index.vue"),
        meta: {
          defaultIcon: "i-fluent-person-16-regular",
          activatedIcon: "i-fluent-person-16-filled",
          order: 520,
        },
      },
    ],
  },
];

export const routersStringify = JSON.stringify(routes);

export default routes;

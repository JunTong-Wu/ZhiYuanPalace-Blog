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
    component: () => import("@/pages/visitor/index/index.vue"), // 路由的组件
    meta: {
      navigate: true, // 路由是否可以被导航
      defaultIcon: "i-solar-home-smile-linear", // 路由的默认图标
      activatedIcon: "i-solar-home-smile-bold", // 路由的激活图标
      order: 1000, // 路由的排序
    },
  },
  {
    path: "/text",
    name: "text",
    component: () => import("@/pages/visitor/text/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-document-text-linear",
      activatedIcon: "i-solar-document-text-bold",
      order: 2000,
    },
    children: [
      {
        path: "/text/article",
        name: "article",
        component: () => import("@/pages/visitor/text/article/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-text-square-linear",
          activatedIcon: "i-solar-text-square-bold",
          order: 2100,
        },
      },
      {
        path: "/text/article/:id",
        name: "article-id",
        component: () => import("@/pages/visitor/text/article/[id].vue"),
        meta: {
          order: 2110,
        },
      },
      {
        path: "/text/shuoshuo",
        name: "shuoshuo",
        component: () => import("@/pages/visitor/text/shuoshuo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-stars-minimalistic-linear",
          activatedIcon: "i-solar-stars-minimalistic-bold",
          order: 2200,
        },
      },
      {
        path: "/text/shuoshuo/:id",
        name: "shuoshuo-id",
        component: () => import("@/pages/visitor/text/shuoshuo/[id].vue"),
        meta: {
          order: 2210,
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
      defaultIcon: "i-solar-music-note-3-linear",
      activatedIcon: "i-solar-music-note-3-bold",
      order: 3000,
    },
  },
  {
    path: "/audio",
    name: "audio",
    component: () => import("@/pages/visitor/audio/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-chat-round-video-linear",
      activatedIcon: "i-solar-chat-round-video-bold",
      order: 4000,
    },
    children: [
      {
        path: "/audio/photo",
        name: "photo",
        component: () => import("@/pages/visitor/audio/photo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-gallery-round-linear",
          activatedIcon: "i-solar-gallery-round-bold",
          order: 4100,
        },
      },
      {
        path: "/audio/photo/:album",
        name: "photo-album",
        component: () =>
          import("@/pages/visitor/audio/photo/[album]/index.vue"),
        meta: {
          order: 4110,
        },
      },
      {
        path: "/audio/video",
        name: "video",
        component: () => import("@/pages/visitor/audio/video/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-videocamera-linear",
          activatedIcon: "i-solar-videocamera-bold",
          order: 4200,
        },
      },
      {
        path: "/audio/video/:id",
        name: "video-id",
        component: () => import("@/pages/visitor/audio/video/[id].vue"),
        meta: {
          order: 4210,
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
      defaultIcon: "i-solar-user-circle-linear",
      activatedIcon: "i-solar-user-circle-bold",
      order: 5000,
    },
    children: [
      {
        path: "/about/information",
        name: "information",
        component: () => import("@/pages/visitor/about/information/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-ghost-smile-linear",
          activatedIcon: "i-solar-ghost-smile-bold",
          order: 5100,
        },
      },
      {
        path: "/about/friend",
        name: "friend",
        component: () => import("@/pages/visitor/about/friend/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-link-circle-linear",
          activatedIcon: "i-solar-link-circle-linear",
          order: 5200,
        },
      },
    ],
  },
  {
    path: "/admin",
    name: "dashboard",
    component: () => import("@/pages/admin/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-pie-chart-2-linear",
      activatedIcon: "i-solar-pie-chart-2-bold",
      order: 6000,
      role: "admin",
    },
  },
  {
    path: "/admin/post-manage",
    name: "post-manage",
    component: () => import("@/pages/admin/post-manage/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-archive-linear",
      activatedIcon: "i-solar-archive-bold",
      order: 6100,
      role: "admin",
    },
    children: [
      {
        path: "/admin/post-manage/article",
        name: "article-manage",
        component: () => import("@/pages/admin/post-manage/article/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-text-square-linear",
          activatedIcon: "i-solar-text-square-bold",
          order: 6110,
          role: "admin",
        },
      },
      {
        path: "/admin/post-manage/article/:id/edit",
        name: "article-manage-edit",
        component: () => import("@/pages/admin/post-manage/article/[id].vue"),
        meta: {
          order: 6111,
        },
      },
      {
        path: "/admin/post-manage/article/add",
        name: "article-manage-add",
        component: () => import("@/pages/admin/post-manage/article/[id].vue"),
        meta: {
          order: 6112,
        },
      },
      {
        path: "/admin/post-manage/shuoshuo",
        name: "shuoshuo-manage",
        component: () => import("@/pages/admin/post-manage/shuoshuo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-stars-minimalistic-linear",
          activatedIcon: "i-solar-stars-minimalistic-bold",
          order: 6120,
          role: "admin",
        },
      },
      {
        path: "/admin/post-manage/music",
        name: "music-manage",
        component: () => import("@/pages/admin/post-manage/music/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-music-note-3-linear",
          activatedIcon: "i-solar-music-note-3-bold",
          order: 6130,
          role: "admin",
        },
      },
      {
        path: "/admin/post-manage/photo",
        name: "photo-manage",
        component: () => import("@/pages/admin/post-manage/photo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-gallery-round-linear",
          activatedIcon: "i-solar-gallery-round-bold",
          order: 6140,
          role: "admin",
        },
      },
      {
        path: "/admin/post-manage/video",
        name: "video-manage",
        component: () => import("@/pages/admin/post-manage/video/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-videocamera-linear",
          activatedIcon: "i-solar-videocamera-bold",
          order: 6150,
          role: "admin",
        },
      },
    ],
  },
  {
    path: "/admin/personal-center",
    name: "personal-center",
    component: () => import("@/pages/admin/personal-center/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-ghost-smile-linear",
      activatedIcon: "i-solar-ghost-smile-bold",
      order: 6200,
      role: "admin",
    },
  },
  {
    path: "/admin/comment-manage",
    name: "comment-manage",
    component: () => import("@/pages/admin/comment-manage/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-dialog-2-linear",
      activatedIcon: "i-solar-dialog-2-bold",
      order: 6300,
      role: "admin",
    },
  },
  {
    path: "/admin/friends-manage",
    name: "friends-manage",
    component: () => import("@/pages/admin/friends-manage/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-link-circle-linear",
      activatedIcon: "i-solar-link-circle-linear",
      order: 6400,
      role: "admin",
    },
  },
  {
    path: "/admin/site-setting",
    name: "site-setting",
    component: () => import("@/pages/admin/site-setting/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-magic-stick-3-linear",
      activatedIcon: "i-solar-magic-stick-3-bold",
      order: 6500,
      role: "admin",
    },
  },
  {
    path: "/admin/server-manage",
    name: "server-manage",
    component: () => import("@/pages/admin/server-manage/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-server-minimalistic-linear",
      activatedIcon: "i-solar-server-minimalistic-bold",
      order: 6600,
      role: "admin",
    },
  },
  {
    path: "/doc",
    name: "document",
    component: () => import("@/pages/document/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-pie-chart-2-linear",
      activatedIcon: "i-solar-pie-chart-2-bold",
      order: 6000,
      type: "doc",
    },
  },
];

export const routersStringify = JSON.stringify(routes);

export default routes;

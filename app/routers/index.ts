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
      defaultIcon: "i-solar-home-smile-linear", // 路由的默认图标
      activatedIcon: "i-solar-home-smile-bold", // 路由的激活图标
      order: 100, // 路由的排序
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
      order: 200,
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
          defaultIcon: "i-solar-stars-minimalistic-linear",
          activatedIcon: "i-solar-stars-minimalistic-bold",
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
      defaultIcon: "i-solar-music-note-3-linear",
      activatedIcon: "i-solar-music-note-3-bold",
      order: 300,
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
      order: 400,
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
          defaultIcon: "i-solar-videocamera-linear",
          activatedIcon: "i-solar-videocamera-bold",
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
      defaultIcon: "i-solar-user-circle-linear",
      activatedIcon: "i-solar-user-circle-bold",
      order: 500,
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
          order: 510,
        },
      },
      {
        path: "/about/friend",
        name: "friend",
        component: () => import("@/pages/visitor/about/friend/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-link-circle-linear",
          activatedIcon: "i-solar-link-circle-bold",
          order: 520,
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
      order: 600,
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
      order: 610,
      role: "admin",
    },
    children: [
      {
        path: "/admin/post-manage/article",
        name: "article-manage",
        component: () => import("@/pages/admin/post-manage/article/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-document-add-linear",
          activatedIcon: "i-solar-document-add-bold",
          order: 611,
          role: "admin",
        },
      },
      {
        path: "/admin/post-manage/shuoshuo",
        name: "shuoshuo-manage",
        component: () => import("@/pages/admin/post-manage/shuoshuo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-notes-linear",
          activatedIcon: "i-solar-notes-bold",
          order: 612,
          role: "admin",
        },
      },
      {
        path: "/admin/post-manage/music",
        name: "music-manage",
        component: () => import("@/pages/admin/post-manage/music/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-turntable-music-note-linear",
          activatedIcon: "i-solar-turntable-music-note-bold",
          order: 613,
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
          order: 614,
          role: "admin",
        },
      },
      {
        path: "/admin/post-manage/video",
        name: "video-manage",
        component: () => import("@/pages/admin/post-manage/video/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-videocamera-record-linear",
          activatedIcon: "i-solar-videocamera-record-bold",
          order: 615,
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
      order: 620,
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
      order: 630,
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
      activatedIcon: "i-solar-link-circle-bold",
      order: 640,
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
      order: 650,
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
      order: 650,
      role: "admin",
    },
  },
];

export const routersStringify = JSON.stringify(routes);

export default routes;

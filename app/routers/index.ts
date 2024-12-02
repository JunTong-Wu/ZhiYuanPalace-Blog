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
      defaultIcon: "i-fluent-home-20-regular", // 路由的默认图标
      activatedIcon: "i-fluent-home-20-filled", // 路由的激活图标
      order: 100, // 路由的排序
    },
  },
  {
    path: "/text",
    name: "text",
    component: () => import("@/pages/visitor/text/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-textbox-20-regular",
      activatedIcon: "i-fluent-textbox-20-filled",
      order: 200,
    },
    children: [
      {
        path: "/text/article",
        name: "article",
        component: () => import("@/pages/visitor/text/article/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-document-text-20-regular",
          activatedIcon: "i-fluent-document-text-20-filled",
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
          defaultIcon: "i-fluent-text-quote-20-regular",
          activatedIcon: "i-fluent-text-quote-20-filled",
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
      defaultIcon: "i-fluent-music-note-2-20-regular",
      activatedIcon: "i-fluent-music-note-2-20-filled",
      order: 300,
    },
  },
  {
    path: "/audio",
    name: "audio",
    component: () => import("@/pages/visitor/audio/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-video-clip-20-regular",
      activatedIcon: "i-fluent-video-clip-20-filled",
      order: 400,
    },
    children: [
      {
        path: "/audio/photo",
        name: "photo",
        component: () => import("@/pages/visitor/audio/photo/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-image-20-regular",
          activatedIcon: "i-fluent-image-20-filled",
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
          defaultIcon: "i-fluent-video-20-regular",
          activatedIcon: "i-fluent-video-20-filled",
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
      defaultIcon: "i-fluent-info-20-regular",
      activatedIcon: "i-fluent-info-20-filled",
      order: 500,
    },
    children: [
      {
        path: "/about/information",
        name: "information",
        component: () => import("@/pages/visitor/about/information/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-person-20-regular",
          activatedIcon: "i-fluent-person-20-filled",
          order: 510,
        },
      },
      {
        path: "/about/friend",
        name: "friend",
        component: () => import("@/pages/visitor/about/friend/index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-person-20-regular",
          activatedIcon: "i-fluent-person-20-filled",
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
      defaultIcon: "i-fluent-chart-multiple-20-regular",
      activatedIcon: "i-fluent-chart-multiple-20-filled",
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
      defaultIcon: "i-fluent-archive-settings-20-regular",
      activatedIcon: "i-fluent-archive-settings-20-filled",
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
          defaultIcon: "i-fluent-document-signature-20-regular",
          activatedIcon: "i-fluent-document-signature-20-filled",
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
          defaultIcon: "i-fluent-tooltip-quote-20-regular",
          activatedIcon: "i-fluent-tooltip-quote-20-filled",
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
          defaultIcon: "i-fluent-music-note-2-play-20-regular",
          activatedIcon: "i-fluent-music-note-2-play-20-filled",
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
          defaultIcon: "i-fluent-image-edit-20-regular",
          activatedIcon: "i-fluent-image-edit-20-filled",
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
          defaultIcon: "i-fluent-video-clip-wand-20-regular",
          activatedIcon: "i-fluent-video-clip-wand-20-filled",
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
      defaultIcon: "i-fluent-person-circle-20-regular",
      activatedIcon: "i-fluent-person-circle-20-filled",
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
      defaultIcon: "i-fluent-comment-note-20-regular",
      activatedIcon: "i-fluent-comment-note-20-filled",
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
      defaultIcon: "i-fluent-person-link-20-regular",
      activatedIcon: "i-fluent-person-link-20-filled",
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
      defaultIcon: "i-fluent-apps-settings-20-regular",
      activatedIcon: "i-fluent-apps-settings-20-filled",
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
      defaultIcon: "i-fluent-server-20-regular",
      activatedIcon: "i-fluent-server-20-filled",
      order: 650,
      role: "admin",
    },
  },
];

export const routersStringify = JSON.stringify(routes);

export default routes;

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
      type: "visitor",
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
      order: 1, // 路由的排序
      type: "visitor", // 路由的类型
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
      order: 1.1,
      type: "visitor",
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
          order: 1.11,
          type: "visitor",
        },
      },
      {
        path: "/text/article/:id",
        name: "article-id",
        component: () => import("@/pages/visitor/text/article/[id].vue"),
        meta: {
          order: 1.111,
          type: "visitor",
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
          order: 1.12,
          type: "visitor",
        },
      },
      {
        path: "/text/shuoshuo/:id",
        name: "shuoshuo-id",
        component: () => import("@/pages/visitor/text/shuoshuo/[id].vue"),
        meta: {
          order: 1.121,
          type: "visitor",
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
      order: 1.2,
      type: "visitor",
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
      order: 1.3,
      type: "visitor",
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
          order: 1.31,
          type: "visitor",
        },
      },
      {
        path: "/audio/photo/:album",
        name: "photo-album",
        component: () =>
          import("@/pages/visitor/audio/photo/[album]/index.vue"),
        meta: {
          order: 1.311,
          type: "visitor",
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
          order: 1.32,
          type: "visitor",
        },
      },
      {
        path: "/audio/video/:id",
        name: "video-id",
        component: () => import("@/pages/visitor/audio/video/[id].vue"),
        meta: {
          order: 1.321,
          type: "visitor",
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
      order: 1.4,
      type: "visitor",
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
          order: 1.41,
          type: "visitor",
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
          order: 1.42,
          type: "visitor",
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
      order: 2,
      type: "admin",
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
      order: 2.1,
      type: "admin",
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
          order: 2.11,
          type: "admin",
        },
      },
      {
        path: "/admin/post-manage/article/:id/edit",
        name: "article-manage-edit",
        component: () => import("@/pages/admin/post-manage/article/[id].vue"),
        meta: {
          order: 2.111,
          type: "admin",
        },
      },
      {
        path: "/admin/post-manage/article/add",
        name: "article-manage-add",
        component: () => import("@/pages/admin/post-manage/article/[id].vue"),
        meta: {
          order: 2.112,
          type: "admin",
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
          order: 2.12,
          type: "admin",
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
          order: 2.13,
          type: "admin",
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
          order: 2.14,
          type: "admin",
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
          order: 2.15,
          type: "admin",
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
      order: 2.2,
      type: "admin",
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
      order: 2.3,
      type: "admin",
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
      order: 2.4,
      type: "admin",
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
      order: 2.5,
      type: "admin",
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
      order: 2.6,
      type: "admin",
    },
  },
  {
    path: "/doc",
    name: "document",
    component: () => import("@/pages/document/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-chat-square-code-linear",
      activatedIcon: "i-solar-chat-square-code-bold",
      order: 3,
      type: "doc",
    },
  },
  {
    path: "/doc/guide",
    name: "guide",
    component: () => import("@/pages/document/guide/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-map-linear",
      activatedIcon: "i-solar-map-bold",
      order: 3.1,
      type: "doc",
    },
    children: [
      {
        path: "/doc/guide/introduction",
        name: "introduction",
        component: () => import("@/pages/document/guide/introduction.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-info-circle-linear",
          activatedIcon: "i-solar-info-circle-bold",
          order: 3.11,
          type: "doc",
        },
      },
      {
        path: "/doc/guide/getting-started",
        name: "getting-started",
        component: () => import("@/pages/document/guide/getting-started.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-solar-bolt-circle-linear",
          activatedIcon: "i-solar-bolt-circle-bold",
          order: 3.12,
          type: "doc",
        },
      },
    ],
  },
  {
    path: "/doc/feature",
    name: "feature",
    component: () => import("@/pages/document/feature/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-solar-stars-linear",
      activatedIcon: "i-solar-stars-bold",
      order: 3.2,
      type: "doc",
    },
    children: [
      {
        path: "/doc/feature/unified-type",
        name: "unified-type",
        component: () => import("@/pages/document/feature/unified-type.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-code-ts-rectangle-16-regular",
          activatedIcon: "i-fluent-code-ts-rectangle-16-filled",
          order: 3.21,
          type: "doc",
        },
      },
      {
        path: "/doc/feature/super-responsive",
        name: "super-responsive",
        component: () =>
          import("@/pages/document/feature/super-responsive.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-layer-diagonal-sparkle-16-regular",
          activatedIcon: "i-fluent-layer-diagonal-sparkle-16-filled",
          order: 3.22,
          type: "doc",
        },
      },
      {
        path: "/doc/feature/touch-interaction",
        name: "touch-interaction",
        component: () =>
          import("@/pages/document/feature/touch-interaction.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-hand-draw-16-regular",
          activatedIcon: "i-fluent-hand-draw-16-filled",
          order: 3.23,
          type: "doc",
        },
      },
      {
        path: "/doc/feature/card-animation",
        name: "card-animation",
        component: () => import("@/pages/document/feature/card-animation.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-rectangle-landscape-sparkle-16-regular",
          activatedIcon: "i-fluent-rectangle-landscape-sparkle-16-filled",
          order: 3.24,
          type: "doc",
        },
      },
    ],
  },
  {
    path: "/doc/components",
    name: "components",
    component: () => import("@/pages/document/components/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-puzzle-piece-16-regular",
      activatedIcon: "i-fluent-puzzle-piece-16-filled",
      order: 3.3,
      type: "doc",
    },
    children: [
      {
        path: "/doc/components/button",
        name: "button",
        component: () => import("@/pages/document/components/button.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-button-16-regular",
          activatedIcon: "i-fluent-button-16-filled",
          order: 3.31,
          type: "doc",
        },
      },
      {
        path: "/doc/components/data-table",
        name: "data-table",
        component: () => import("@/pages/document/components/data-table.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-fluent-table-16-regular",
          activatedIcon: "i-fluent-table-16-filled",
          order: 3.32,
          type: "doc",
        },
      },
    ],
  },
  {
    path: "/doc/api",
    name: "api",
    component: () => import("@/pages/document/api/index.vue"),
    meta: {
      navigate: true,
      defaultIcon: "i-fluent-plug-connected-16-regular",
      activatedIcon: "i-fluent-plug-connected-16-filled",
      order: 3.4,
      type: "doc",
    },
    children: [
      {
        path: "/doc/api/articles/index",
        name: "articles-index",
        component: () =>
          import("@/pages/document/api/articles/articles-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.401,
          type: "doc",
        },
      },
      {
        path: "/doc/api/articles/show",
        name: "articles-show",
        component: () =>
          import("@/pages/document/api/articles/articles-show.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.402,
          type: "doc",
        },
      },
      {
        path: "/doc/api/articles/add",
        name: "articles-add",
        component: () =>
          import("@/pages/document/api/articles/articles-add.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.403,
          type: "doc",
        },
      },
      {
        path: "/doc/api/articles/update",
        name: "articles-update",
        component: () =>
          import("@/pages/document/api/articles/articles-update.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.404,
          type: "doc",
        },
      },
      {
        path: "/doc/api/shuoshuos/index",
        name: "shuoshuos-index",
        component: () =>
          import("@/pages/document/api/shuoshuos/shuoshuos-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.405,
          type: "doc",
        },
      },
      {
        path: "/doc/api/shuoshuos/show",
        name: "shuoshuos-show",
        component: () =>
          import("@/pages/document/api/shuoshuos/shuoshuos-show.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.406,
          type: "doc",
        },
      },
      {
        path: "/doc/api/photos/index",
        name: "photos-index",
        component: () => import("@/pages/document/api/photos/photos-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.407,
          type: "doc",
        },
      },
      {
        path: "/doc/api/photos/albums/index",
        name: "photos-albums-index",
        component: () =>
          import("@/pages/document/api/photos/photos-albums-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.408,
          type: "doc",
        },
      },
      {
        path: "/doc/api/photos/albums/password/verify",
        name: "photos-albums-password-verify",
        component: () =>
          import(
            "@/pages/document/api/photos/photos-albums-password-verify.vue"
          ),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.409,
          type: "doc",
        },
      },
      {
        path: "/doc/api/videos/index",
        name: "videos-index",
        component: () => import("@/pages/document/api/videos/videos-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.41,
          type: "doc",
        },
      },
      {
        path: "/doc/api/videos/show",
        name: "videos-show",
        component: () => import("@/pages/document/api/videos/videos-show.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.411,
          type: "doc",
        },
      },
      {
        path: "/doc/api/videos/password/verify",
        name: "videos-password-verify",
        component: () =>
          import("@/pages/document/api/videos/videos-password-verify.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.412,
          type: "doc",
        },
      },
      {
        path: "/doc/api/music/index",
        name: "music-index",
        component: () => import("@/pages/document/api/music/music-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.413,
          type: "doc",
        },
      },
      {
        path: "/doc/api/friends/index",
        name: "friends-index",
        component: () =>
          import("@/pages/document/api/friends/friends-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.414,
          type: "doc",
        },
      },
      {
        path: "/doc/api/users/login",
        name: "users-login",
        component: () => import("@/pages/document/api/users/users-login.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.415,
          type: "doc",
        },
      },
      {
        path: "/doc/api/dashboard/index",
        name: "dashboard-index",
        component: () =>
          import("@/pages/document/api/dashboard/dashboard-index.vue"),
        meta: {
          navigate: true,
          defaultIcon: "i-radix-icons-dot",
          activatedIcon: "i-radix-icons-dot-filled",
          order: 3.416,
          type: "doc",
        },
      },
    ],
  },
];

export const routersStringify = JSON.stringify(routes);

export default routes;

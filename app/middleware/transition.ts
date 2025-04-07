import { cardTransitionEnd as ArticleCardTransitionEnd } from "~/components/layout/ArticleCard/transition";
import { cardTransitionEnd as ShuoShuoCardTransitionEnd } from "~/components/layout/ShuoShuoCard/transition";
import { cardTransitionEnd as AlbumCardTransitionEnd } from "~/components/layout/AlbumCard/transition";
import { cardTransitionEnd as VideoCardTransitionEnd } from "~/components/layout/VideoCard/transition";
import {
  footerBarHide,
  footerBarShow,
} from "~/components/layout/FooterNavigation/transition";
import {
  footerColumnsHide,
  footerColumnsShow,
} from "~/components/layout/FooterColumns/transition";
import {
  headerBarHide,
  headerBarShow,
} from "~/components/layout/Header/transition";
import {
  musicBarHide,
  musicBarShow,
} from "~/components/layout/MusicPlayer/transition";
import {
  toolBarHide,
  toolBarShow,
} from "~/components/layout/Toolbar/transition";

type pageTransitionType = {
  name: string;
  mode: string;
  onBeforeEnter: Function;
  onEnter: Function;
  onAfterEnter: Function;
  onEnterCancelled: Function;
  onBeforeLeave: Function;
  onLeave: Function;
  onAfterLeave: Function;
  onLeaveCancelled: Function;
};

const cardTransitionEnds = (path: string) => {
  if (path.includes("/text/article")) {
    ArticleCardTransitionEnd();
  }
  if (path.includes("/text/shuoshuo")) {
    ShuoShuoCardTransitionEnd();
  }
  if (path.includes("/audio/photo")) {
    AlbumCardTransitionEnd();
  }
  if (path.includes("/audio/video")) {
    VideoCardTransitionEnd();
  }
};

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = "auto";
    }
  }
  if (to.path !== "/login") {
    if (from.meta.type === "visitor" && to.meta.type === "visitor") {
      //  一级页面切换
      if (getPageLevelByRoute(from) == 1 && getPageLevelByRoute(to) == 1) {
        if (getRootOrderByRoute(from) > getRootOrderByRoute(to)) {
          // console.log("动画：一级页面切换（向前切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as pageTransitionType).name =
              "first-layer-prev";
            (to.meta.pageTransition as pageTransitionType).name =
              "first-layer-prev";
          }
        } else if (getRootOrderByRoute(from) < getRootOrderByRoute(to)) {
          // console.log("动画：一级页面切换（向后切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as pageTransitionType).name =
              "first-layer-next";
            (to.meta.pageTransition as pageTransitionType).name =
              "first-layer-next";
          }
        }
      }
      //  一级和二级页面切换
      if (
        (getPageLevelByRoute(from) == 1 && getPageLevelByRoute(to) == 2) ||
        (getPageLevelByRoute(from) == 2 && getPageLevelByRoute(to) == 1)
      ) {
        if (getRootOrderByRoute(from) > getRootOrderByRoute(to)) {
          // console.log("动画：一级和二级页面切换（向前切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as pageTransitionType).name =
              "first-layer-prev";
            (to.meta.pageTransition as pageTransitionType).name =
              "first-layer-prev";
          }
        } else if (getRootOrderByRoute(from) < getRootOrderByRoute(to)) {
          // console.log("动画：一级和二级页面切换（向后切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as pageTransitionType).name =
              "first-layer-next";
            (to.meta.pageTransition as pageTransitionType).name =
              "first-layer-next";
          }
        }
      }
      //  二级页面切换
      if (getPageLevelByRoute(from) == 2 && getPageLevelByRoute(to) == 2) {
        if (getRootPathByRoute(from) == getRootPathByRoute(to)) {
          if (getSelfOrderByRoute(from) > getSelfOrderByRoute(to)) {
            // console.log("动画：二级相同根路径页面切换（向前切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as pageTransitionType).name =
                "second-layer-prev";
              (to.meta.pageTransition as pageTransitionType).name =
                "second-layer-prev";
            }
          } else if (getSelfOrderByRoute(from) < getSelfOrderByRoute(to)) {
            // console.log("动画：二级相同根路径页面切换（向后切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as pageTransitionType).name =
                "second-layer-next";
              (to.meta.pageTransition as pageTransitionType).name =
                "second-layer-next";
            }
          }
        } else {
          if (getRootOrderByRoute(from) > getRootOrderByRoute(to)) {
            // console.log("动画：二级不同根路径页面切换（向前切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as pageTransitionType).name =
                "first-layer-prev";
              (to.meta.pageTransition as pageTransitionType).name =
                "first-layer-prev";
            }
          } else if (getRootOrderByRoute(from) < getRootOrderByRoute(to)) {
            // console.log("动画：二级不同根路径页面切换（向后切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as pageTransitionType).name =
                "first-layer-next";
              (to.meta.pageTransition as pageTransitionType).name =
                "first-layer-next";
            }
          }
        }
      }
      //  进入三级页面
      if (getPageLevelByRoute(from) < 3 && getPageLevelByRoute(to) == 3) {
        // console.log("动画：进入三级页面");
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as pageTransitionType).name = "third-layer";
          (to.meta.pageTransition as pageTransitionType).name = "third-layer";
          (to.meta.pageTransition as pageTransitionType).onEnter = () => {
            headerBarShow();
            musicBarShow();
            toolBarShow();
            footerColumnsShow();
            setTimeout(() => {
              cardTransitionEnds(to.fullPath);
            }, 200);
          };
        }
      }
      //  退出三级页面
      if (getPageLevelByRoute(from) == 3 && getPageLevelByRoute(to) < 3) {
        // console.log("动画：退出三级页面");
        footerBarHide();
        footerColumnsHide();
        headerBarHide();
        musicBarHide();
        toolBarHide();
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as pageTransitionType).name = "third-layer";
          (to.meta.pageTransition as pageTransitionType).name =
            "second-layer-prev";
          (to.meta.pageTransition as pageTransitionType).onEnter = () => {
            footerBarShow();
            footerColumnsShow();
            headerBarShow();
            musicBarShow();
            toolBarShow();
            setTimeout(() => {
              cardTransitionEnds(to.fullPath);
            }, 200);
          };
        }
      }
    } else {
      if (getSelfOrderByRoute(from) > getSelfOrderByRoute(to)) {
        // console.log("动画：管理员或文档页面切换（向前切换）");
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as pageTransitionType).name =
            "first-layer-prev";
          (to.meta.pageTransition as pageTransitionType).name =
            "first-layer-prev";
        }
      } else if (getSelfOrderByRoute(from) < getSelfOrderByRoute(to)) {
        // console.log("动画：管理员或文档页面切换（向后切换）");
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as pageTransitionType).name =
            "first-layer-next";
          (to.meta.pageTransition as pageTransitionType).name =
            "first-layer-next";
        }
      }
    }
  } else {
    // console.log("动画：进入登录页面");
    if (from.meta.pageTransition && to.meta.pageTransition) {
      (from.meta.pageTransition as pageTransitionType).name =
        "first-layer-prev";
      (to.meta.pageTransition as pageTransitionType).name = "first-layer-prev";
    }
  }
});

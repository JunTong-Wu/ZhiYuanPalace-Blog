import NProgress from 'nprogress';
import { cardTransitionEnd as ArticleCardTransitionEnd } from '~/components/layout/ArticleCard/transition';
import { cardTransitionEnd as ShuoShuoCardTransitionEnd } from '~/components/layout/ShuoShuoCard/transition';
import { cardTransitionEnd as AlbumCardTransitionEnd } from '~/components/layout/AlbumCard/transition';
import { cardTransitionEnd as VideoCardTransitionEnd } from '~/components/layout/VideoCard/transition';
import {
  footerBarHide,
  footerBarShow,
} from '~/components/layout/FooterNavigation/transition';
import {
  footerColumnsHide,
  footerColumnsShow,
} from '~/components/layout/FooterColumns/transition';
import {
  headerBarHide,
  headerBarShow,
} from '~/components/layout/Header/transition';
import {
  musicBarHide,
  musicBarShow,
} from '~/components/layout/MusicPlayer/transition';
import {
  toolBarHide,
  toolBarShow,
} from '~/components/layout/Toolbar/transition';

const cardTransitionEnds = (path: string) => {
  if (path.includes('/text/article')) {
    ArticleCardTransitionEnd();
  }
  if (path.includes('/text/shuoshuo')) {
    ShuoShuoCardTransitionEnd();
  }
  if (path.includes('/audio/photo')) {
    AlbumCardTransitionEnd();
  }
  if (path.includes('/audio/video')) {
    VideoCardTransitionEnd();
  }
};

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = 'auto';
    }
  }
  if (to.path !== '/login') {
    if (from.meta.role !== 'admin' && to.meta.role !== 'admin') {
      //  一级页面切换
      if (getPageLevel(from.fullPath) == 1 && getPageLevel(to.fullPath) == 1) {
        if (process.client) {
          NProgress.start();
          setTimeout(() => {
            NProgress.done();
          }, 100);
        }
        if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
          // console.log("动画：一级页面切换（向前切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as any).name = 'first-layer-prev';
            (to.meta.pageTransition as any).name = 'first-layer-prev';
          }
        } else if (
          getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
        ) {
          // console.log("动画：一级页面切换（向后切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as any).name = 'first-layer-next';
            (to.meta.pageTransition as any).name = 'first-layer-next';
          }
        }
      }
      //  一级和二级页面切换
      if (
        (getPageLevel(from.fullPath) == 1 && getPageLevel(to.fullPath) == 2) ||
        (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 1)
      ) {
        if (process.client) {
          NProgress.start();
          setTimeout(() => {
            NProgress.done();
          }, 100);
        }
        if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
          // console.log("动画：一级和二级页面切换（向前切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as any).name = 'first-layer-prev';
            (to.meta.pageTransition as any).name = 'first-layer-prev';
          }
        } else if (
          getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
        ) {
          // console.log("动画：一级和二级页面切换（向后切换）");
          if (from.meta.pageTransition && to.meta.pageTransition) {
            (from.meta.pageTransition as any).name = 'first-layer-next';
            (to.meta.pageTransition as any).name = 'first-layer-next';
          }
        }
      }
      //  二级页面切换
      if (getPageLevel(from.fullPath) == 2 && getPageLevel(to.fullPath) == 2) {
        if (process.client) {
          NProgress.start();
          setTimeout(() => {
            NProgress.done();
          }, 100);
        }
        if (getRootPath(from.fullPath) == getRootPath(to.fullPath)) {
          if (getSelfOrder(from.fullPath) > getSelfOrder(to.fullPath)) {
            // console.log("动画：二级相同根路径页面切换（向前切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as any).name = 'second-layer-prev';
              (to.meta.pageTransition as any).name = 'second-layer-prev';
            }
          } else if (getSelfOrder(from.fullPath) < getSelfOrder(to.fullPath)) {
            // console.log("动画：二级相同根路径页面切换（向后切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as any).name = 'second-layer-next';
              (to.meta.pageTransition as any).name = 'second-layer-next';
            }
          }
        } else {
          if (getRootPathOrder(from.fullPath) > getRootPathOrder(to.fullPath)) {
            // console.log("动画：二级不同根路径页面切换（向前切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as any).name = 'first-layer-prev';
              (to.meta.pageTransition as any).name = 'first-layer-prev';
            }
          } else if (
            getRootPathOrder(from.fullPath) < getRootPathOrder(to.fullPath)
          ) {
            // console.log("动画：二级不同根路径页面切换（向后切换）");
            if (from.meta.pageTransition && to.meta.pageTransition) {
              (from.meta.pageTransition as any).name = 'first-layer-next';
              (to.meta.pageTransition as any).name = 'first-layer-next';
            }
          }
        }
      }
      //  进入三级页面
      if (getPageLevel(from.fullPath) < 3 && getPageLevel(to.fullPath) == 3) {
        // console.log("动画：进入三级页面");
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = 'third-layer';
          (to.meta.pageTransition as any).name = 'third-layer';
          (to.meta.pageTransition as any).onEnter = () => {
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
      if (getPageLevel(from.fullPath) == 3 && getPageLevel(to.fullPath) < 3) {
        // console.log("动画：退出三级页面");
        footerBarHide();
        footerColumnsHide();
        headerBarHide();
        musicBarHide();
        toolBarHide();
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = 'third-layer';
          (to.meta.pageTransition as any).name = 'second-layer-prev';
          (to.meta.pageTransition as any).onEnter = () => {
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
    } else if (from.meta.role === 'admin' && to.meta.role === 'admin') {
      if (getSelfOrder(from.fullPath) > getSelfOrder(to.fullPath)) {
        // console.log("动画：管理员页面切换（向前切换）");
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = 'first-layer-prev';
          (to.meta.pageTransition as any).name = 'first-layer-prev';
        }
      } else if (getSelfOrder(from.fullPath) < getSelfOrder(to.fullPath)) {
        // console.log("动画：管理员页面切换（向后切换）");
        if (from.meta.pageTransition && to.meta.pageTransition) {
          (from.meta.pageTransition as any).name = 'first-layer-next';
          (to.meta.pageTransition as any).name = 'first-layer-next';
        }
      }
    }
  } else {
    // console.log("动画：进入登录页面");
    if (from.meta.pageTransition && to.meta.pageTransition) {
      (from.meta.pageTransition as any).name = 'first-layer-prev';
      (to.meta.pageTransition as any).name = 'first-layer-prev';
    }
  }

  // HeaderTitle
  // const { clearPostInfo } = toRefs(store.usePostInfo());
  // clearPostInfo.value();
});

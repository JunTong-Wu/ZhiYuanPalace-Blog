import { footerBarHide } from '~/components/layout/FooterNavigation/transition';
import { footerColumnsHide } from '~/components/layout/FooterColumns/transition';
import { headerBarHide } from '~/components/layout/Header/transition';
import { musicBarHide } from '~/components/layout/MusicPlayer/transition';
import { toolBarHide } from '~/components/layout/Toolbar/transition';

export function cardTransitionStart(element: any, callback: () => void) {
  console.log('动画：展开视频卡片');
  const mainViewElement = document.querySelector('.main-view') as any;
  let mainViewTop = 0;
  let mainViewLeft = 0;
  let mainViewRight = 0;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  if (mainViewElement) {
    const view = mainViewElement.getBoundingClientRect();
    mainViewTop = view.top;
    mainViewLeft = view.left;
    mainViewRight = view.right;
  }
  // 预备动画
  element.classList.add('transition-prepare');

  // 正式动画
  setTimeout(() => {
    element.classList.remove('transition-prepare');
    setTimeout(() => {
      // 复制一个绝对定位的卡片，制作动画
      const tempElement = document.createElement('div');
      tempElement.id = 'temp-element';
      tempElement.style.position = 'fixed';
      tempElement.style.top = '0px';
      tempElement.style.left = '0px';
      tempElement.style.width = windowWidth + 'px';
      tempElement.style.height = windowHeight + 'px';
      tempElement.style.zIndex = '100';
      tempElement.style.opacity = '0';
      tempElement.style.backgroundColor = '#000000';
      tempElement.style.transition = 'opacity 0.2s ease-in-out';
      document.body.appendChild(tempElement);
      element.style.opacity = 0;

      const layoutDefault = document.querySelector('.layout-main') as any;
      if (layoutDefault) {
        layoutDefault.classList.add('transition');
      }

      setTimeout(() => {
        footerBarHide();
        footerColumnsHide();
        headerBarHide();
        musicBarHide();
        toolBarHide();
        tempElement.classList.add('transition-in');
        setTimeout(() => {
          tempElement.style.opacity = '1';
          setTimeout(() => {
            callback();
          }, 200);
        });
      }, 20);
    }, 80);
  }, 80);
}
export function cardTransitionEnd() {
  console.log('动画：清理视频卡片占位元素');
  const tempElement = document.getElementById('temp-element');
  if (tempElement) {
    tempElement.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(tempElement);
    }, 200);
  }
  const layoutDefault = document.querySelector('.layout-main') as any;
  if (layoutDefault) {
    layoutDefault.classList.remove('transition');
  }
}

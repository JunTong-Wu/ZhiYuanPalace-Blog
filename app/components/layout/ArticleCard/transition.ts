import { footerBarHide } from "~/components/layout/FooterNavigation/transition";
import { footerColumnsHide } from "~/components/layout/FooterColumns/transition";
import { headerBarHide } from "~/components/layout/Header/transition";
import { musicBarHide } from "~/components/layout/MusicPlayer/transition";
import { toolBarHide } from "~/components/layout/Toolbar/transition";

export function cardTransitionStart(element: any, callback: () => void) {
  console.log("动画：展开文章卡片");
  const mainViewElement = document.querySelector(".main-view") as any;
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
  element.classList.add("transition-prepare");

  // 正式动画
  setTimeout(() => {
    element.classList.remove("transition-prepare");
    setTimeout(() => {
      // 获取元素的位置
      const rect = element.getBoundingClientRect();

      // 复制一个绝对定位的卡片，制作动画
      const copyElement = element.cloneNode(true);
      copyElement.id = "temp-element";
      copyElement.style.position = "fixed";
      copyElement.style.top = rect.top + "px";
      copyElement.style.left = rect.left + "px";
      copyElement.style.width = rect.width + "px";
      copyElement.style.height = rect.height + "px";
      copyElement.style.zIndex = "20";
      document.body.appendChild(copyElement);
      element.style.opacity = 0;

      const layoutDefault = document.querySelector(".layout-main") as any;
      if (layoutDefault) {
        layoutDefault.classList.add("transition");
      }

      setTimeout(() => {
        footerBarHide();
        footerColumnsHide();
        headerBarHide();
        musicBarHide();
        toolBarHide();
        copyElement.classList.add("transition-in");
        setTimeout(() => {
          copyElement.style.top = 0 + "px";
          copyElement.style.left = mainViewLeft + "px";
          copyElement.style.width = mainViewRight - mainViewLeft + "px";
          copyElement.style.height = windowHeight + "px";
          setTimeout(() => {
            callback();
          }, 600);
        });
      }, 20);
    }, 80);
  }, 80);
}
export function cardTransitionEnd() {
  console.log("动画：清理文章卡片占位元素");
  const tempElement = document.getElementById("temp-element");
  if (tempElement) {
    document.body.removeChild(tempElement);
  }
  const layoutDefault = document.querySelector(".layout-main") as any;
  if (layoutDefault) {
    layoutDefault.classList.remove("transition");
  }
}

import type { DirectiveBinding } from "vue";

export const ZyParallaxTranslation = {
  mounted(el: HTMLElement) {
    const mouse = { x: 0, y: 0 };
    let rect = el.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    function onMouseMove(event: MouseEvent) {
      if (!isMobileDevice() && !isVertical()) {
        // 重新获取元素的当前位置
        const currentRect = el.getBoundingClientRect();
        const centerXNow = currentRect.left + currentRect.width / 2;
        const centerYNow = currentRect.top + currentRect.height / 2;
        // 更新mouse以反映鼠标移动后的相对位置
        mouse.x = event.clientX - centerXNow;
        mouse.y = event.clientY - centerYNow;
        // 更新rect和center以供后续使用
        rect = currentRect;
        center.x = centerXNow;
        center.y = centerYNow;
      } else {
        mouse.x = 0;
        mouse.y = 0;
      }
    }

    function onScroll() {
      if (!isMobileDevice() && !isVertical()) {
        // 重新获取元素的当前位置
        const currentRect = el.getBoundingClientRect();
        const centerXNow = currentRect.left + currentRect.width / 2;
        const centerYNow = currentRect.top + currentRect.height / 2;
        const deltaX = centerXNow - (rect.left + rect.width / 2);
        const deltaY = centerYNow - (rect.top + rect.height / 2);
        // 更新mouse以反映滚动后的相对位置
        if (mouse.x !== 0 || mouse.y !== 0) {
          mouse.x -= deltaX;
          mouse.y -= deltaY;
        }
        // 更新rect和center以供后续使用
        rect = currentRect;
        center.x = centerXNow;
        center.y = centerYNow;
      } else {
        mouse.x = 0;
        mouse.y = 0;
      }
    }

    function onWindowResize() {
      setTimeout(() => {
        if (isMobileDevice()) {
          mouse.x = 0;
          mouse.y = 0;
        }
      }, 20);
    }

    function movement() {
      const xValue = calcValue(mouse.x, window.innerWidth);
      const yValue = calcValue(mouse.y, window.innerHeight);

      el.style.transform = `translate3d(${xValue}px, ${yValue}px, 0)`;
      const children = el.querySelectorAll<HTMLElement>(
        ".mb-parallax-move-layer-front",
      );
      if (children) {
        for (let i = 0; i < children.length; i++) {
          children[i].style.transform = `translate3d(${xValue * 2}px, ${
            yValue * 1
          }px, 50px)`;
        }
      }

      requestAnimationFrame(movement);
    }

    // 监听最顶级祖先section标签
    getAncestorSectionByElement(el)?.addEventListener("mousemove", onMouseMove);
    // document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onWindowResize);
    requestAnimationFrame(movement);
  },
};

function calcValue(mouseCoord: number, screenSize: number): number {
  const range = 20; // 这个值可以根据需要调整变换的幅度
  const offsetRatio = mouseCoord / screenSize;
  return offsetRatio * range;
}

declare function isMobileDevice(): boolean;
declare function isVertical(): boolean;
declare function getAncestorSectionByElement(
  el: HTMLElement,
): HTMLElement | null;

export default ZyParallaxTranslation;

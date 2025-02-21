/**
 * @description: 设备判断函数
 * @return : Boolean
 */
export const isMobileDevice = () => {
  const mobileUserAgentRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileUserAgentRegex.test(navigator.userAgent);
};
/**
 * @description: 屏幕方向判断函数
 * @return : Boolean
 */
export const isVertical = () => {
  const mql = window.matchMedia('(orientation: portrait)');
  return mql.matches;
};
/**
 * @description: 获取指定节点的最顶级祖先section标签的元素
 * @return : HTMLElement
 */
export const getAncestorSectionByElement = (
  element: HTMLElement | null,
): HTMLElement | null => {
  let ancestor: HTMLElement | null = element?.parentNode as HTMLElement | null;
  if (!ancestor) {
    return document.body;
  }
  while (
    ancestor &&
    ancestor.tagName &&
    ancestor.tagName.toLowerCase() !== 'section' &&
    ancestor.tagName.toLowerCase() !== 'body'
  ) {
    ancestor = ancestor.parentNode as HTMLElement | null;
  }
  return ancestor;
};

/**
 * @description: 获取指定节点的中心点
 * @return : { x: centerX, y: centerY }
 */
export const getElementCenterByElement = (
  element: HTMLElement,
): { x: number; y: number } | null => {
  // 获取元素的位置信息
  const rect = element.getBoundingClientRect();

  // 计算中心点坐标
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return { x: centerX, y: centerY };
};

/**
 * @description: 获取窗口的中心点
 * @return : { x: centerX, y: centerY }
 */

export const getWindowCenter = (): { x: number; y: number } => {
  // 获取窗口尺寸
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // 计算中心点坐标
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;

  return { x: centerX, y: centerY };
};

/**
 * @description: 检查元素的部分是否在窗口内
 * @return : Boolean
 */
export const isElementInViewport = (el: HTMLElement): boolean => {
  if (!el) return false; // 处理元素不存在的情况
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView = rect.top <= windowHeight && rect.bottom >= 0;
  const horInView = rect.left <= windowWidth && rect.right >= 0;
  return vertInView && horInView;
};

/**
 * @description: 全屏
 * @return : null
 */
export const fullScreen = () => {
  const element = document.documentElement; //若要全屏页面div
  //IE 10及以下ActiveXObject
  if (window.ActiveXObject) {
    const WsShell = new window.ActiveXObject('WScript.Shell');
    WsShell.SendKeys('{F11}');
    //写全屏后的执行函数
  }
  //HTML W3C 提议
  // @ts-ignore
  else if (element.requestFullScreen) {
    // @ts-ignore
    element.requestFullScreen();
    //写全屏后的执行函数
  }
  //IE11
  // @ts-ignore
  else if (element.msRequestFullscreen) {
    // @ts-ignore
    element.msRequestFullscreen();
    //写全屏后的执行函数
  }
  // Webkit (works in Safari5.1 and Chrome 15)
  // @ts-ignore
  else if (element.webkitRequestFullScreen) {
    // @ts-ignore
    element.webkitRequestFullScreen();
    //写全屏后的执行函数
  }
  // Firefox (works in nightly)
  // @ts-ignore
  else if (element.mozRequestFullScreen) {
    // @ts-ignore
    element.mozRequestFullScreen();
    //写全屏后的执行函数
  } else {
    alert('此设备不支持 Fullscreen API');
  }
};

/**
 * @description: 退出全屏
 * @return : null
 */
export const fullExit = () => {
  const element = document.documentElement; //若要全屏页面中
  const doc = document;
  //IE ActiveXObject
  if (window.ActiveXObject) {
    const WsShell = new window.ActiveXObject('WScript.Shell');
    WsShell.SendKeys('{F11}');
    //写退出全屏后的执行函数
  }
  //HTML5 W3C 提议
  // @ts-ignore
  else if (element.requestFullScreen) {
    // @ts-ignore
    doc.exitFullscreen();
    //写退出全屏后的执行函数
  }
  //IE 11
  // @ts-ignore
  else if (element.msRequestFullscreen) {
    // @ts-ignore
    doc.msExitFullscreen();
    //写退出全屏后的执行函数
  }
  // Webkit (works in Safari5.1 and Chrome 15)
  // @ts-ignore
  else if (element.webkitRequestFullScreen) {
    // @ts-ignore
    doc.webkitCancelFullScreen();
    //写退出全屏后的执行函数
  }
  // Firefox (works in nightly)
  // @ts-ignore
  else if (element.mozRequestFullScreen) {
    // @ts-ignore
    doc.mozCancelFullScreen();
    //写退出全屏后的执行函数
  }
};

/**
 * @description: 夜间模式切换
 * @return : null
 */
export const darkModeSwitch = (e: MouseEvent) => {
  // 检查是否支持 startViewTransition API
  if (typeof document.startViewTransition === 'function') {
    // 支持 startViewTransition API，使用过渡动画
    const transition = document.startViewTransition(() => {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    });

    const x = e.clientX;
    const y = e.clientY;

    const tragetRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0% at ${x}px ${y}px)`,
            `circle(${tragetRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400,
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  } else {
    // 不支持 startViewTransition API，直接切换暗模式
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }
};

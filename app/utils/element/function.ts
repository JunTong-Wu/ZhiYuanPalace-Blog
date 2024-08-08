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
  const mql = window.matchMedia("(orientation: portrait)");
  return mql.matches;
};
/**
 * @description: 获取指定节点的最顶级祖先section标签的元素
 * @return : HTMLElement
 */
export const getAncestorSectionByElement = (
  element: HTMLElement | null
): HTMLElement | null => {
  let ancestor: HTMLElement | null = element?.parentNode as HTMLElement | null;
  while (
    ancestor !== null &&
    ancestor.tagName.toLowerCase() !== "section" &&
    ancestor.tagName.toLowerCase() !== "body"
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
  element: HTMLElement
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

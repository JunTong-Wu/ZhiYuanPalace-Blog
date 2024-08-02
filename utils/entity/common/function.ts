/**
 * @description: 获取图片的主颜色
 * @param {*} img 图片元素
 * @return {*} [r:number, g:number, b:number]
 */
export const getImageColor = (img: any): [number, number, number] => {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var context = canvas.getContext("2d");
  img.crossOrigin = "Anonymous";
  context?.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 获取像素数据
  var data = context?.getImageData(0, 0, img.width, img.height).data;
  if (data) {
    var r = 1,
      g = 1,
      b = 1;
    // 取所有像素的平均值
    for (var row = 0; row < img.height; row++) {
      for (var col = 0; col < img.width; col++) {
        // console.log(data[((img.width * row) + col) * 4])
        if (row == 0) {
          r += data[img.width * row + col];
          g += data[img.width * row + col + 1];
          b += data[img.width * row + col + 2];
        } else {
          r += data[(img.width * row + col) * 4];
          g += data[(img.width * row + col) * 4 + 1];
          b += data[(img.width * row + col) * 4 + 2];
        }
      }
    }
    // 求取平均值
    r /= img.width * img.height;
    g /= img.width * img.height;
    b /= img.width * img.height;

    // 将最终的值取整
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return [r, g, b];
  } else {
    return [0, 0, 0];
  }
};

/**
 * @description: 将RGB转换为HSV
 * @param {*} rgb [r:number, g:number, b:number]
 * @return {*} hsv [h:number, s:number, v:number]
 */
// RGB到HSV的转换
const rgbToHsv = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max !== min) {
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return [h * 360, s * 100, v * 100];
};

/**
 * @description: 将RGB转换为HSL
 * @param {*} rgb [r:number, g:number, b:number]
 * @return {*} hsv [h:number, s:number, l:number]
 */
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return { h, s, l };
}


/**
 * @description: 将HSV转换为RGB
 * @param {*} hsv [h:number, s:number, v:number]
 * @return {*} rgb [r:number, g:number, b:number]
 */
const hsvToRgb = (
  h: number,
  s: number,
  v: number
): [number, number, number] => {
  h = h % 360;
  s = s / 100;
  v = v / 100;

  let r = 0,
    g = 0,
    b = 0;

  if (s === 0) {
    r = v;
    g = v;
    b = v;
  } else {
    const i = Math.trunc(h / 60);
    const f = h / 60 - i;
    const p = v * (1.0 - s);
    const q = v * (1.0 - s * f);
    const t = v * (1.0 - s * (1.0 - f));

    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      default:
        r = v;
        g = p;
        b = q;
        break;
    }
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return [r, g, b];
};

/**
 * @description: 将HSL转换为RGB
 * @param {*} rgb [k:number, s:number, l:number]
 * @return {*} hsv [r:number, g:number, b:number]
 */
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * @description: 保持颜色的色调和饱和度不变,限制亮度区间
 * @param {*} rgb [r:number, g:number, b:number]
 * @param {*} maxBrightness number(0~100)
 * @param {*} minBrightness number(0~100)
 * @return {*} [r:number, g:number, b:number]
 */
export const adjustBrightnessWhilePreservingHue = (
  rgb: [number, number, number],
  maxBrightness: number,
  minBrightness: number
): [number, number, number] => {
  const [h, s, v] = rgbToHsv(...rgb);
  const newV = Math.max(minBrightness, Math.min(v, maxBrightness)); // 确保newV在minBrightness和maxBrightness之间
  return hsvToRgb(h, s, newV);
};

/**
 * @description: 判断是否是对象
 * @param {*} obj
 * @return {*} boolean
 */
export const isObject = (obj: any) => {
  return obj !== null && typeof obj === "object";
};

/**
 * @description: 增加颜色饱和度
 * @param rgb - [r:number, g:number, b:number]
 * @param factor - 饱和度增加的比例，范围是 0 到 1 之间
 * @returns [r:number, g:number, b:number]
 */
export const increaseSaturation = ([r, g, b]: [number, number, number], factor: number): [number, number, number] => {
  // 将 RGB 转换为 HSL
  const { h, s, l } = rgbToHsl(r, g, b);
  // 调整饱和度
  const newS = Math.min(1, Math.max(0, s * factor));
  // 将 HSL 转换回 RGB
  const [newR, newG, newB] = hslToRgb(h, newS, l);
  return [newR, newG, newB];
}

/**
 * @description: 判断两个对象是否相同（包含绝对相等和他们是否有相同的形状）
 * @param {*} a object1
 * @param {*} b object2
 * @return {*} boolean
 */
export const looseEqual = function (a: any, b: any): boolean {
  if (a === b) {
    //如果是绝对相等就直接返回true
    return true;
  }
  //如果不是绝对相等就哦按的他们是否有相同的形状
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    //两个均是对象
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        //如果都是数组
        if (a.length === b.length) {
          //如果长度相等
          return a.every(function (e: any, i: any) {
            //用every和递归来比对a数组和b数组的每个元素，并返回
            return looseEqual(e, b[i]);
          });
        }
        //长度都不等直接返回false
        return false;
      } else if (a instanceof Date && b instanceof Date) {
        //如果是Date 则直接getTime 比较
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        //对象的比较
        //拿到两个对象的key
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        if (keysA.length === keysB.length) {
          //如果keys相等
          return keysA.every(function (key) {
            //用every和递归来比对a对象和b对象的每个元素值，并返回
            return looseEqual(a[key], b[key]);
          });
        }
        //长度都不等直接返回false
        return false;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    //如果都不是对象则按String来处理
    return String(a) === String(b);
  } else {
    return false;
  }
};

/**
 * @description: UTC时间ISO转换成北京时间
 * @param {*} date ISOString
 * @return {*} string
 */
export const BeiJingTime = function (date: string): string {
  const time = new Date(+new Date(date) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
  return time;
};

/**
 * @description: 设备判断函数
 * @return : Boolean
 */
export const isMobileDevice = () => {
  const mobileUserAgentRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
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
export const getAncestorSectionByElement = (element: HTMLElement | null): HTMLElement | null => {
  let ancestor: HTMLElement | null = element?.parentNode as HTMLElement | null;
  while (ancestor !== null && ancestor.tagName.toLowerCase() !== "section" && ancestor.tagName.toLowerCase() !== "body") {
    console.log(ancestor)
    ancestor = ancestor.parentNode as HTMLElement | null;
  }
  return ancestor;
};

/**
 * @description: 获取指定节点的中心点
 * @return : { x: centerX, y: centerY }
 */
export const getElementCenterByElement = (element: HTMLElement): { x: number; y: number } | null => {
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
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView = rect.top <= windowHeight && rect.bottom >= 0;
  const horInView = rect.left <= windowWidth && rect.right >= 0;
  return vertInView && horInView;
};

/**
 * @description: 防抖函数
 * @return : Function
 */
export const debounce = (func: () => void, delay: number): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: Window, ...args: any) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

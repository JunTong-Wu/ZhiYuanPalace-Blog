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
 * @description: 降低亮度的同时保持颜色的色调和饱和度不变
 * @param {*} rgb [r:number, g:number, b:number]
 * @param {*} maxBrightness number(0~100)
 * @return {*} [r:number, g:number, b:number]
 */
export const darkenRgbWhilePreservingHue = (
  rgb: [number, number, number],
  maxBrightness: number
): [number, number, number] => {
  const [h, s, v] = rgbToHsv(...rgb);
  const newV = Math.min(v, maxBrightness);
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

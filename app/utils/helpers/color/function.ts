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
  if (img.width && img.height) {
    var data = context?.getImageData(0, 0, img.width, img.height).data;
    if (data) {
      var r = 1,
        g = 1,
        b = 1;
      // 取所有像素的平均值
      for (var row = 0; row < img.height; row++) {
        for (var col = 0; col < img.width; col++) {
          if (row == 0) {
            // @ts-ignore
            r += data[img.width * row + col];
            // @ts-ignore
            g += data[img.width * row + col + 1];
            // @ts-ignore
            b += data[img.width * row + col + 2];
          } else {
            // @ts-ignore
            r += data[(img.width * row + col) * 4];
            // @ts-ignore
            g += data[(img.width * row + col) * 4 + 1];
            // @ts-ignore
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
  b: number,
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
const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
};

/**
 * @description: 将HSV转换为RGB
 * @param {*} hsv [h:number, s:number, v:number]
 * @return {*} rgb [r:number, g:number, b:number]
 */
const hsvToRgb = (
  h: number,
  s: number,
  v: number,
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
const hslToRgb = (
  h: number,
  s: number,
  l: number,
): [number, number, number] => {
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

  // 限制 r, g, b 不超过 255
  r = Math.min(Math.round(r * 255), 255);
  g = Math.min(Math.round(g * 255), 255);
  b = Math.min(Math.round(b * 255), 255);
  // 确保 r, g, b 不小于 0
  r = Math.max(r, 0);
  g = Math.max(g, 0);
  b = Math.max(b, 0);

  return [r, g, b];
};

/**
 * @description: 将RGB转换为HEX
 * @param rgb - [k:number, s:number, l:number]
 * @return hex - string
 */
export const rgbToHex = (rgb: [number, number, number]): string => {
  const [r, g, b] = rgb;
  const toHex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * @description: 保持颜色的色调和饱和度不变,限制亮度区间
 * @param rgb - [r:number, g:number, b:number]
 * @param maxBrightness - number(0~100)
 * @param minBrightness - number(0~100)
 * @return [r:number, g:number, b:number]
 */
export const adjustBrightnessWhilePreservingHue = (
  rgb: [number, number, number],
  maxBrightness: number,
  minBrightness: number,
): [number, number, number] => {
  const [h, s, v] = rgbToHsv(...rgb);
  const newV = Math.max(minBrightness, Math.min(v, maxBrightness)); // 确保newV在minBrightness和maxBrightness之间
  return hsvToRgb(h, s, newV);
};

/**
 * @description: 增加颜色饱和度
 * @param rgb - [r:number, g:number, b:number]
 * @param factor - 饱和度增加的比例，范围是 0 到 1 之间
 * @returns [r:number, g:number, b:number]
 */
export const increaseSaturation = (
  [r, g, b]: [number, number, number],
  factor: number,
): [number, number, number] => {
  // 将 RGB 转换为 HSL
  const [h, s, l] = rgbToHsl(r, g, b);
  // 调整饱和度
  const newS = Math.min(1, Math.max(0, s * factor));
  // 将 HSL 转换回 RGB
  const [newR, newG, newB] = hslToRgb(h, newS, l);
  return [newR, newG, newB];
};

/**
 * @description: 生成TailwindColors
 * @param rgb - [r:number, g:number, b:number]
 * @return tailwindColors - { [key: string]: string }
 */
export const generateTailwindColors = (
  rgb: [number, number, number],
): { [key: string]: string } => {
  let [h, s, l] = rgbToHsl(...rgb);

  // 将 s 和 l 转换到 [0, 100] 的范围
  s *= 100;
  l *= 100;

  return {
    50: rgbToHex(hslToRgb(h, s / 100, (l + 45) / 100)),
    100: rgbToHex(hslToRgb(h, s / 100, (l + 36) / 100)),
    200: rgbToHex(hslToRgb(h, s / 100, (l + 27) / 100)),
    300: rgbToHex(hslToRgb(h, s / 100, (l + 18) / 100)),
    400: rgbToHex(hslToRgb(h, s / 100, (l + 9) / 100)),
    500: rgbToHex(hslToRgb(h, s / 100, l / 100)),
    600: rgbToHex(hslToRgb(h, s / 100, (l - 9) / 100)),
    700: rgbToHex(hslToRgb(h, s / 100, (l - 18) / 100)),
    800: rgbToHex(hslToRgb(h, s / 100, (l - 27) / 100)),
    900: rgbToHex(hslToRgb(h, s / 100, (l - 36) / 100)),
    950: rgbToHex(hslToRgb(h, s / 100, (l - 45) / 100)),
  };
};

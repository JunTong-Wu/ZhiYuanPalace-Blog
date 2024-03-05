export const getImageColor = (img: any) => {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var context = canvas.getContext("2d");
  img.crossOrigin = "Anonymous";
  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 获取像素数据
  var data = context.getImageData(0, 0, img.width, img.height).data;
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
};

export const darkenRgb = (
  rgb: [number, number, number]
): [number, number, number] => {
  // 确保输入值在0-255范围内
  const ensureRange = (value: number): number =>
    Math.max(0, Math.min(255, value));

  // 将每个颜色通道的值减少到其原始值的80%
  const darkenedR = ensureRange(Math.round(rgb[0] * 0.6));
  const darkenedG = ensureRange(Math.round(rgb[1] * 0.6));
  const darkenedB = ensureRange(Math.round(rgb[2] * 0.6));

  return [darkenedR, darkenedG, darkenedB];
};

export const rgbtohsl = (rgb: any) => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  let l = (min + max) / 2;
  const difference = max - min;
  let h, s;
  if (max == min) {
    h = 0;
    s = 0;
  } else {
    s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min);
    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0);
        break;
      case g:
        h = 2.0 + (b - r) / difference;
        break;
      case b:
        h = 4.0 + (r - g) / difference;
        break;
    }
    h = Math.round(h * 60);
  }
  s = Math.round(s * 100 * 1.5);
  l = Math.round(l * 100 * 0.8);
  const str = "hsl(" + h + "," + s + "%," + l + "%)";
  return str;
};

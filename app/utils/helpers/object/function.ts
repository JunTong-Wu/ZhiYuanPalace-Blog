/**
 * @description: 判断是否是对象
 * @param {*} obj
 * @return {*} boolean
 */
export const isObject = (obj: any) => {
  return obj !== null && typeof obj === 'object';
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
type FormatType = 'YYYY-MM-DD' | 'YYYY-MM-DD hh:mm:ss' | string;

export const dateFormat = (
  utcISOString: string,
  format: FormatType = 'YYYY-MM-DD hh:mm:ss',
): string => {
  // 将 UTC 时间 ISO 字符串转换为 Date 对象
  const utcDate = new Date(utcISOString);

  // 转换为北京时间（UTC+8）
  const beijingDate = new Date(
    utcDate.getTime() +
      utcDate.getTimezoneOffset() * 60 * 1000 +
      8 * 60 * 60 * 1000,
  );

  // 提取年、月、日、时、分、秒
  const year = beijingDate.getFullYear();
  const month = String(beijingDate.getMonth() + 1).padStart(2, '0');
  const day = String(beijingDate.getDate()).padStart(2, '0');
  const hours = String(beijingDate.getHours()).padStart(2, '0');
  const minutes = String(beijingDate.getMinutes()).padStart(2, '0');
  const seconds = String(beijingDate.getSeconds()).padStart(2, '0');

  // 替换格式字符串中的占位符
  const replaceTokens = (token: string): string => {
    switch (token) {
      case 'YYYY':
        return year.toString();
      case 'MM':
        return month;
      case 'DD':
        return day;
      case 'hh':
        return hours;
      case 'mm':
        return minutes;
      case 'ss':
        return seconds;
      default:
        return token;
    }
  };

  // 使用正则表达式替换格式字符串中的占位符
  const formattedDate = format.replace(/YYYY|MM|DD|hh|mm|ss/g, replaceTokens);

  return formattedDate;
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

/**
 * @description: 暂停执行函数
 * @return : Function
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

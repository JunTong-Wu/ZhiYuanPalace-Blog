export const BeiJingTime = function (date: string): string {
  const time = new Date(+new Date(date) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '');
  return time;
};

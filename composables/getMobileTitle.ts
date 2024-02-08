export const getMobileTitle = (path: string) => {
  let title = "empty";
  const linkList = getNavigationMap();
  const getItem = linkList.find((item) => {
    return item.path == path;
  });
  if (getItem) {
    title = getItem.title;
  }
  return title;
};

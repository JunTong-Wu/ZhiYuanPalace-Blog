export default interface ApiDataTypes {
  res: globalThis.Ref<any>;
  pending: globalThis.Ref<any>;
  error: globalThis.Ref<any>;
  refresh: any;
}
/**
 * 全局搜索
 */
export const search = (parameter: object) => {
  const value: ApiDataTypes = useMyFetch('get', '/search', parameter);
  return value;
};

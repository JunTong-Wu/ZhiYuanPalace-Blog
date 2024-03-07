export type Route = {
  path: string;
  title: string;
  defaultIcon?: string;
  activatedIcon?: string;
  order: number;
  children?: Route[];
};
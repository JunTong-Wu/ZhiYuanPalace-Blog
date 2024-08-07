export type Route = {
    path: string;
    title: string;
    defaultIcon?: string;
    activatedIcon?: string;
    iconImage?: string;
    order: number;
    children?: Route[];
};
export interface TableHeader {
  name?: string;
  key: string;
  sortingField?: string; // 提供字段在接口中的ID用于排序
  sortable?: boolean; // 字段允许被排序
  align?: string;
  offset?: string;
  columnClass?: string;
}

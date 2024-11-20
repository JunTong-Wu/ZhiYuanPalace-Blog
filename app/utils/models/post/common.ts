export type PostType =
  | "article"
  | "shuoshuo"
  | "song"
  | "album"
  | "video"
  | "site"
  | "unknown";

export interface PostInfo {
  id: number;
  type: PostType;
  title: string;
}

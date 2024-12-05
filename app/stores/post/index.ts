import { defineStore } from "pinia";
type PostType =
  | "article"
  | "shuoshuo"
  | "song"
  | "album"
  | "video"
  | "site"
  | "unknown";

interface PostInfo {
  id: number;
  type: PostType;
  title: string;
}

export const usePostInfo = defineStore("postInfo", {
  state: () => {
    return <PostInfo>{
      id: 0,
      type: "unknown",
      title: "",
    };
  },
  actions: {
    setPostInfo(id: number, type: PostType, title: string) {
      console.log("setPostInfo");
      this.id = id;
      this.type = type;
      this.title = title;
    },
    clearPostInfo() {
      console.log("clearPostInfo");
      this.id = 0;
      this.type = "unknown";
      this.title = "";
    },
  },
});

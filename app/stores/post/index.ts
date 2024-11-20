import { defineStore } from "pinia";

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
      this.id = id;
      this.type = type;
      this.title = title;
    },
    clearPostInfo() {
      this.id = 0;
      this.type = "unknown";
      this.title = "";
    },
  },
});

import type { ResOptions } from "./options";

export class PostsNumber {
  total: number = 0;
  article: number = 0;
  shuoshuo: number = 0;
  video: number = 0;
  photo: number = 0;
}
export class OSInfo {
  sys_version: string = "";
  sys_uptime: number = 0;
  cpu_platform: string = "";
  cpu_arch: string = "";
  cpu_count: number = 0;
  cpu_model: string = "";
  cpu_speed: number = 0;
  cpu_use: number = 0;
  cpu_free: number = 0;
  ram_totalmem: number = 0;
  ram_freemem: number = 0;
}

export class Dashboard {
  posts_number: PostsNumber;
  os_info: OSInfo;
  constructor() {
    this.posts_number = new PostsNumber();
    this.os_info = new OSInfo();
  }
}

export interface ApiIndex {
  params: null;
  result: ResOptions<Dashboard>;
}

// stores/queue.ts
import { defineStore } from 'pinia';

export const useQueueStore = defineStore('queue', {
  state: () => ({
    queue: [] as { key: string; fn: string }[], // 存储key和字符串化的函数
    keysSet: new Set<string>(), // 用于去重的Set
  }),
  actions: {
    enqueue(key: string, fn: string) {
      if (!this.keysSet.has(key)) {
        this.queue.push({ key, fn });
        this.keysSet.add(key);
      }
    },
    dequeue(): { key: string; fn: string } | undefined {
      return this.queue.shift();
    },
    clearQueue() {
      this.queue = [];
      this.keysSet.clear();
    },
    executeQueue() {
      while (this.queue.length > 0) {
        const queueItem = this.dequeue();
        if (queueItem) {
          const fn = new Function(`return (${queueItem.fn})`)(); // 重新解析函数
          fn();
        }
      }
      this.clearQueue();
    },
  },
});

declare global {
  interface Window
    extends EventTarget,
      AnimationFrameProvider,
      GlobalEventHandlers,
      WindowEventHandlers,
      WindowLocalStorage,
      WindowOrWorkerGlobalScope,
      WindowSessionStorage {
    ZyToast(config: CustomAlertOptions): void;
  }
}

export interface CustomAlertOptions {
  title: string;
  text?: string;
  duration?: number;
  type?: string;
  icon?: string;
  callback?: () => void;
}

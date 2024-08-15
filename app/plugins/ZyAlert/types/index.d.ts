declare global {
    interface Window extends EventTarget, AnimationFrameProvider, GlobalEventHandlers, WindowEventHandlers, WindowLocalStorage, WindowOrWorkerGlobalScope, WindowSessionStorage {
        ZyAlert(config: CustomAlertOptions): void;
    }
}

export interface CustomAlertOptions {
    title?: string;
    text?: string;
}
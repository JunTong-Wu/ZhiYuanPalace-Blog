declare global {
  interface Window
    extends EventTarget,
      AnimationFrameProvider,
      GlobalEventHandlers,
      WindowEventHandlers,
      WindowLocalStorage,
      WindowOrWorkerGlobalScope,
      WindowSessionStorage {
    isDarkMode: boolean;
    OML2D: {
      loadOhMyLive2D: (options: any) => void;
    };
    ZyDesignSize: {
      min_xs_v: number;
      min_xs_h: number;
      xs_sm_v: number;
      xs_sm_h: number;
      sm_md_v: number;
      sm_md_h: number;
      md_lg_v: number;
      md_lg_h: number;
      lg_xl_v: number;
      lg_xl_h: number;
      xl_max_v: number;
      xl_max_h: number;
    };
    ZyBreakPoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    ZyFontSize: number;
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

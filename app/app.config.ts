export default defineAppConfig({
  ui: {
    primary: 'theme',
    gray: 'slate',
    input: {
      default: {
        color: 'theme',
      },
      variant: {
        outline: 'bg-level-1 py-4 ring-0 focus:ring-0 rounded-2xs',
      },
      icon: {
        color: 'text-slate-400 dark:text-slate-600',
      },
    },
    modal: {
      overlay: {
        background: 'bg-mask dark:bg-mask backdrop-blur-xl',
        transition: {
          enter: 'duration-200',
        },
      },
      background: 'bg-level-1 dark:bg-level-1',
      rounded: 'rounded',
    },
    card: {
      rounded: 'rounded',
      ring: 'ring-slate-100 dark:ring-slate-800',
      background: 'bg-level-2 dark:bg-level-2',
    },
    alert: {
      rounded: 'rounded',
    },
    range: {
      progress: {
        rounded: 'rounded-full',
        background:
          'bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(255,255,255,0.4)]',
      },
      thumb: {
        background:
          '[&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:dark:bg-transparent [&::-moz-range-thumb]:bg-transparent',
        ring: '[&::-webkit-slider-thumb]:ring-0 [&::-webkit-slider-thumb]:ring-0',
      },
      track: {
        background:
          '[&::-webkit-slider-runnable-track]:bg-[rgba(255,255,255,0.2)] [&::-moz-range-track]:bg-[rgba(255,255,255,0.2)] [&::-webkit-slider-runnable-track]:dark:bg-[rgba(255,255,255,0.2)] [&::-moz-range-track]:dark:bg-[rgba(255,255,255,0.2)]',
      },
    },
  },
});

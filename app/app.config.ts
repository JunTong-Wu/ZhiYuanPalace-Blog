export default defineAppConfig({
  ui: {
    primary: 'theme',
    gray: 'slate',
    input: {
      default: {
        color: 'theme',
      },
      variant: {
        outline: 'bg-slate-100 dark:bg-slate-900 py-4 ring-0 focus:ring-0 rounded-xl',
      },
      icon: {
        color: 'text-slate-400 dark:text-slate-600',
      },
    },
    modal: {
      overlay: {
        background: 'bg-bg-mask dark:bg-bg-mask backdrop-blur-xl',
        transition: {
          enter: 'duration-200',
        }
      },
      background: 'bg-bg-panel dark:bg-bg-panel',
      rounded: 'rounded-3xl',
    },
    card: {
      rounded: 'rounded-3xl',
      ring: 'ring-slate-100 dark:ring-slate-800',
      background: 'bg-bg-panel dark:bg-bg-panel',
    }
  }
})
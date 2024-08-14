export default defineAppConfig({
  ui: {
    primary: 'theme',
    gray: 'slate',
    input: {
      default: {
        color: 'theme',
      },
      variant: {
        outline: 'bg-transparent outline-none shadow-none ring-0 border-b-4 border-slate-100 dark:border-slate-600 rounded-none focus:ring-0 focus:border-{color}-500 pl-0 py-4 transition-border-color duration-300',
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
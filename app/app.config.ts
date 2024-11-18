export default defineAppConfig({
  ui: {
    primary: "theme",
    gray: "slate",
    input: {
      default: {
        color: "theme",
      },
      variant: {
        outline:
          "bg-slate-100 dark:bg-slate-900 py-4 ring-0 focus:ring-0 rounded",
      },
      icon: {
        color: "text-slate-400 dark:text-slate-600",
      },
    },
    modal: {
      overlay: {
        background: "bg-mask dark:bg-mask backdrop-blur-xl",
        transition: {
          enter: "duration-200",
        },
      },
      background: "bg-level-1 dark:bg-level-1",
      rounded: "rounded",
    },
    card: {
      rounded: "rounded",
      ring: "ring-slate-100 dark:ring-slate-800",
      background: "bg-level-1 dark:bg-level-1",
    },
  },
});

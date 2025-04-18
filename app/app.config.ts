export default defineAppConfig({
  ui: {
    primary: "theme",
    gray: "slate",
    input: {
      rounded: "!rounded-sm",
      variant: {
        outline: "bg-level-3 py-4 ring-0 focus:ring-0 rounded-2xs",
      },
      icon: {
        color: "text-{color}-500 dark:text-{color}-300",
      },
      default: {
        color: "theme",
        size: "lg",
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
      divide: "divide-none",
      ring: "ring-slate-100 dark:ring-slate-800",
      background: "bg-level-2 dark:bg-level-1",
      shadow: "shadow portrait:shadow-none",
      body: {
        padding: "p-2 sm:p-4 lg:p-6",
      },
      header: {
        padding: "p-2 sm:p-4 lg:p-6 !pb-0",
      },
      footer: {
        padding: "p-2 sm:p-4 lg:p-6",
      },
    },
    alert: {
      rounded: "rounded",
    },
    range: {
      progress: {
        rounded: "rounded-full",
        background:
          "bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(255,255,255,0.4)]",
      },
      thumb: {
        background:
          "[&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:dark:bg-transparent [&::-moz-range-thumb]:bg-transparent",
        ring: "[&::-webkit-slider-thumb]:ring-0 [&::-webkit-slider-thumb]:ring-0",
      },
      track: {
        background:
          "[&::-webkit-slider-runnable-track]:bg-[rgba(255,255,255,0.2)] [&::-moz-range-track]:bg-[rgba(255,255,255,0.2)] [&::-webkit-slider-runnable-track]:dark:bg-[rgba(255,255,255,0.2)] [&::-moz-range-track]:dark:bg-[rgba(255,255,255,0.2)]",
      },
    },
    pagination: {
      wrapper: "flex items-center gap-2",
      rounded: "rounded-sm first:rounded-sm last:rounded-sm",
      base: "!shadow-none !ring-0 min-h-10 min-w-10 justify-center",
      default: {
        size: "md",
        activeButton: {
          color: "theme" as any,
          class: "text-white dark:text-white",
        },
      },
    },
    checkbox: {
      rounded: "rounded-xs",
      base: "h-6 w-6",
      background: "bg-level-3 dark:bg-level-3",
      border: "border-none",
      default: {
        color: "theme",
      },
    },
    select: {
      rounded: "rounded-xs",
      variant: {
        none: "bg-level-3 ring-0 shadow-none",
      },
      default: {
        size: "lg",
        color: "theme",
        variant: "none",
      },
    },
    selectMenu: {
      rounded: "rounded-xs",
      padding: "!p-2",
      option: {
        rounded: "rounded-2xs",
        active: "bg-level-4 dark:bg-level-4",
      },
    },
    formGroup: {
      label: {
        base: "font-bold text-text-2 text-sm my-2",
      },
    },
    toggle: {
      default: {
        size: "xl",
        color: "theme",
      },
    },
  },
});

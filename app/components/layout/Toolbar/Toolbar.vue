<template>
  <ClientOnly>
    <Teleport to="#zy-tool-bar">
      <div
        id="zy-tool-bar-inner"
        class="absolute inset-0 flex flex-col items-stretch justify-between w-full gap-8"
      >
        <div
          v-if="$slots['header']"
          class="overflow-y-auto"
          :class="{
            'bg-level-2 dark:bg-level-1 ring-1 ring-slate-100 dark:ring-slate-800 shadow rounded p-6':
              headerBackground,
          }"
        >
          <slot name="header" />
        </div>

        <div
          v-if="$slots['default']"
          class="flex-1 overflow-y-auto"
          :class="{
            'bg-level-2 dark:bg-level-1 ring-1 ring-slate-100 dark:ring-slate-800 shadow rounded p-6':
              bodyBackground,
          }"
        >
          <slot />
        </div>

        <div
          v-if="$slots['footer']"
          class="overflow-y-auto"
          :class="{
            'bg-level-2 dark:bg-level-1 ring-1 ring-slate-100 dark:ring-slate-800 shadow rounded p-6':
              footerBackground,
          }"
        >
          <slot name="footer" />
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
<script setup lang="ts">
  import "./transition.scss";

  const props = defineProps({
    headerBackground: {
      type: Boolean,
      default: false,
    },
    bodyBackground: {
      type: Boolean,
      default: false,
    },
    footerBackground: {
      type: Boolean,
      default: false,
    },
  });
</script>

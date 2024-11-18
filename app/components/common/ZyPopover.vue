<template>
  <div>
    <HeadlessMenu>
      <div ref="EventListenerRef" class="relative" @click="openMenu()">
        <slot name="reference" />
      </div>
      <Teleport to="body">
        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform opacity-0"
          enter-to-class="transform opacity-100" leave-active-class="transition duration-100 ease-out"
          leave-from-class="transform opacity-100" leave-to-class="transform opacity-0">
          <div v-if="open" class="fixed" :class="{ 'opacity-0 pointer-events-none': !open && init }" :style="mainStyle">
            <div ref="popoverInnerRef"
              class="flex flex-col h-full backdrop-blur-3xl will-change-transform rounded-xs overflow-hidden shadow-2xl min-w-24 border-none dark:border dark:border-solid dark:border-borderColor"
              :style="{ 'background-color': background }">
              <slot name="actions" />
            </div>
          </div>
        </transition>
      </Teleport>
    </HeadlessMenu>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  background: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "bottom", // 指定方向
  },
  zIndex: { type: Number, default: 2000 }, // 指定显示层级
});

const EventListenerRef = ref();
const popoverInnerRef = ref();

const init = ref(true);
const mainStyle = computed(() => {
  // 根据EventListenerRef的位置计算弹出菜单的位置
  if (EventListenerRef.value && popoverInnerRef.value) {
    const eventRect = EventListenerRef.value.getBoundingClientRect();
    const innerRect = popoverInnerRef.value.getBoundingClientRect();
    if (innerRect.width) {
      init.value = false;
    }
    let top, left;
    switch (props.position) {
      case "top":
        top = eventRect.top - innerRect.height;
        left = eventRect.left + eventRect.width / 2 - innerRect.width / 2;
        break;
      case "top-left":
        top = eventRect.top - innerRect.height;
        left = eventRect.left;
        break;
      case "top-right":
        top = eventRect.top - innerRect.height;
        left = eventRect.left + eventRect.width - innerRect.width;
        break;
      case "bottom":
        top = eventRect.top + eventRect.height;
        left = eventRect.left + eventRect.width / 2 - innerRect.width / 2;
        break;
      case "bottom-left":
        top = eventRect.top + eventRect.height;
        left = eventRect.left;
        break;
      case "bottom-right":
        top = eventRect.top + eventRect.height;
        left = eventRect.left + eventRect.width - innerRect.width;
        break;
      case "left":
        top = eventRect.top + eventRect.height / 2 - innerRect.height / 2;
        left = eventRect.left - innerRect.width;
        break;
      case "right":
        top = eventRect.top + eventRect.height / 2 - innerRect.height / 2;
        left = eventRect.left + eventRect.width;
        break;
      default:
        top = eventRect.top + eventRect.height;
        left = eventRect.left + eventRect.width / 2 - innerRect.width / 2;
        break;
    }
    return {
      top: `${top}px`,
      left: `${left}px`,
      zIndex: props.zIndex,
    };
  }
});

const open = ref(false);
const closeMenu = (e: any) => {
  if (
    e.target.closest(".language-button") ||
    e.target.closest(".language-menu-item")
  ) {
    return;
  }
  open.value = false;
  document.removeEventListener("click", closeMenu);
};
const openMenu = () => {
  if (!open.value) {
    open.value = true;
    setTimeout(() => {
      document.addEventListener("click", closeMenu);
    });
  } else {
    open.value = false;
    document.removeEventListener("click", closeMenu);
  }
};
</script>

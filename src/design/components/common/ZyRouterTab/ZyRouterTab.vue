<template>
  <div>
    <div>
      <button
        type="button"
        v-for="i in children"
        v-zy-ripple
        bg-transparent
        text-sm
        border-0
        color="text-1 dark:text-dark-1"
        @click="switchTab(i.path)"
      >
        {{ i.name }}
      </button>
    </div>
    <div w-full>
      <div
        flex
        ref="slideWrapper"
        text-sm
        :style="`width: ${
          100 * children.length
        }% ; transform: translateX(${initTranslateX}%)`"
      >
        <div
          v-for="i in children"
          flex-none
          text-sm
          :style="`width: ${100 / children.length}%`"
        >
          <slot :name="`key-${i.key}`"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
interface ChildrenSetting {
  name: string;
  key: string;
  path: string;
}
export default defineComponent({
  name: "zy-router-tab",
  props: {
    children: {
      type: Array<ChildrenSetting>,
      default: <Array<ChildrenSetting>>[],
    },
  },
  setup(props, ctx) {
    // 初始化位置
    const initTranslateX = ref(0);
    const initView = () => {
      const route = useRoute();
      const oldIndex = props.children.findIndex((item) => {
        return item.path == route.path;
      });
      initTranslateX.value = (100 / props.children.length) * oldIndex * -1;
    };
    initView();

    // 改变地址栏
    const oldPath = ref("");
    const replaceUrl = (newPath: string) => {
      if (oldPath.value != newPath) {
        history.replaceState({}, "", newPath);
      }
    };

    // 切换窗口
    const slideWrapper = ref<HTMLElement | null>(null);
    const changeView = (newPath: string) => {
      if (oldPath.value != newPath) {
        const newIndex = props.children.findIndex((item) => {
          return item.path == newPath;
        });
        if (slideWrapper.value) {
          slideWrapper.value.style.transition = "transform 400ms";
          slideWrapper.value.style.transform = `translateX(${
            (100 / props.children.length) * newIndex * -1
          }%)`;
        }
      }
    };
    const switchTab = (newPath: string) => {
      replaceUrl(newPath);
      changeView(newPath);
      oldPath.value = window.location.pathname;
    };
    onMounted(() => {
      oldPath.value = window.location.pathname;
    });
    return { props, switchTab, slideWrapper, initTranslateX };
  },
});
</script>

<template>
  <div class="">
    <!-- 待演示的组件 -->
    <div
      class="text-base border border-borderColor p-8 rounded bg-level-2 text-text-1"
      :class="{ dark: isNightMode }"
    >
      <slot></slot>
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <!-- 控制代码显示和隐藏的按钮 -->
      <ZyButton
        @click="toggleCodeVisibility"
        type="icon"
        class="border !rounded-full !p-2"
        :class="{
          '!bg-theme-500 !text-white': isCodeVisible,
        }"
      >
        <UIcon name="i-solar-code-linear" />
      </ZyButton>
      <!-- 控制夜间模式的按钮 -->
      <ZyButton
        @click="toggleNightMode"
        type="icon"
        class="border !rounded-full !p-2"
        :class="{
          '!bg-theme-500 !text-white': isNightMode,
        }"
      >
        <UIcon name="i-solar-moon-linear" />
      </ZyButton>
      <!-- 一键复制代码的按钮 -->
      <ZyButton
        @click="copyCode"
        type="icon"
        class="border !rounded-full !p-2"
      >
        <UIcon name="i-solar-copy-linear" />
      </ZyButton>
    </div>

    <!-- 代码展示区域 -->
    <div
      class="pre-wrapper mt-4 text-text-1"
      :class="{
        'code-hidden': !isCodeVisible,
      }"
    >
      <pre><code ref="codeElement" class="language-typescript">{{ code.trim() }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import Prism from "prismjs";
  import "prismjs/themes/prism.css";

  const isCodeVisible = ref(false);
  const isNightMode = ref(false);
  const code = ref("");
  const codeElement = ref(null);

  const toggleCodeVisibility = () => {
    isCodeVisible.value = !isCodeVisible.value;
    if (isCodeVisible.value) {
      if (
        codeElement.value !== null &&
        typeof codeElement.value === "object" &&
        "nodeType" in codeElement.value
      ) {
        Prism.highlightElement(codeElement.value);
      }
    }
  };
  const toggleNightMode = () => {
    isNightMode.value = !isNightMode.value;
  };
  const copyCode = () => {
    navigator.clipboard
      .writeText(code.value)
      .then(() => {
        window.ZyToast({
          title: "复制成功",
          text: "代码已复制到剪贴板",
        });
      })
      .catch((err) => {
        console.error("无法复制代码: ", err);
      });
  };
  const setCode = (codeString: string) => {
    code.value = codeString;
  };
  const highlightCode = () => {
    if (
      codeElement.value !== null &&
      typeof codeElement.value === "object" &&
      "nodeType" in codeElement.value
    ) {
      Prism.highlightElement(codeElement.value);
    }
  };
  onMounted(() => {
    highlightCode();
  });
  watch(
    () => code.value,
    (newValue) => {
      if (newValue) {
        highlightCode();
      }
    },
  );
  defineExpose({
    setCode,
  });
</script>
<style scoped>
  .pre-wrapper {
    display: grid;
    grid-template-rows: 1fr;
    overflow: hidden;
    transition: all 0.3s;
    padding: 1.5rem;
    background-color: var(--bg-level-3);
    border-radius: var(--border-radius-base);
    filter: blur(0px);
    &.code-hidden {
      padding: 0;
      grid-template-rows: 0fr;
      filter: blur(30px);
    }
    pre {
      min-height: 0;
      padding: 0;
      margin: 0;
    }
  }
</style>

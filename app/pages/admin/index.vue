<template>
  <div>
    <div class="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-bg-bestCard">
      <div class="bg-bg-card p-8 rounded-2xl min-w-[20rem] flex flex-col items-center justify-center shadow-lg">
        <h1 class="text-2xl font-bold text-center mb-4">登录知鸢宫</h1>

        <div class="flex flex-col items-center">
          <UInput
              v-model="username"
            placeholder="请输入用户名"
            class="mb-4"
          ></UInput>
          <UInput
              v-model="password"
            placeholder="请输入密码"
            type="password"
            class="mb-4"
          ></UInput >
          <UButton type="primary" @click="login">登录</UButton>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
useHead({
  title: "登录",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-login",
  },
});
definePageMeta({
  layout: 'admin',
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>

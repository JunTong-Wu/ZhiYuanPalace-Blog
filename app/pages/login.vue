<template>
  <div>
    <div
        class="absolute top-0 left-0 z-10 w-full h-full flex flex-col items-center justify-center bg-bg-bestCard"
    >
      <Logo class="px-4 portrait:hidden mb-8" size="large" />
      <Logo class="px-4 landscape:hidden" size="default" />
      <div
          class="bg-bg-card portrait:bg-bg-bestCard p-8 landscape:pt-12 rounded-2xl landscape:min-w-[34rem] portrait:w-full flex flex-col items-center justify-center mb-8 landscape:shadow-lg"
      >
        <h1 class="text-2xl portrait:hidden font-bold text-center">登录</h1>
        <div class="flex flex-col items-center gap-8 w-full mt-4 p-4">
          <div class="flex flex-col items-center gap-8 w-full mb-8">
            <UInput
                v-model="username"
                icon="i-ri-account-box-fill"
                placeholder="请输入用户名"
                class="w-full"
                size="xl"
                color="indigo"
            ></UInput>
            <UInput
                v-model="password"
                icon="i-ri-lock-password-fill"
                placeholder="请输入密码"
                type="password"
                class="w-full"
                size="xl"
                color="indigo"
            ></UInput>
          </div>
          <div class="portrait:absolute bottom-24 left-0 right-0 z-10 flex justify-center">
            <ZyButton
                type="none"
                class="w-48 text-xl portrait:text-base p-4 border-4 rounded-full border-slate-100 dark:border-slate-600 text-slate-500 hover:border-indigo-500 hover:text-indigo-500 font-bold portrait:font-normal"  @click="login">登录</ZyButton>
          </div>
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
  layout: "admin",
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});

const username = ref("admin");
const password = ref("Wjt991128!@#$%^");

// 获取文章列表
const login = () => {
  const {res: loginRes} = ApiUser.login({
    username: username.value,
    password: password.value,
  });
  console.log(loginRes.value)
};

</script>

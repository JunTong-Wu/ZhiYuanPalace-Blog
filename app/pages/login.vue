<template>
  <div class="">
    <div
      class="translate-screen-center w-full flex flex-col items-center justify-center"
    >
      <Logo
        class="px-4 portrait:hidden mb-8"
        size="large"
      />
      <Logo
        class="px-4 landscape:hidden"
        size="default"
      />
      <div
        class="bg-level-2 portrait:bg-transparent p-8 landscape:pt-12 rounded landscape:min-w-[34rem] portrait:w-full flex flex-col items-center justify-center mb-8 landscape:shadow-lg"
      >
        <h1
          class="text-2xl portrait:hidden font-bold text-center font-montserrat"
        >
          Sign in to ZhiYuanPalace
        </h1>
        <div class="flex flex-col items-center gap-8 w-full mt-4 p-4">
          <div class="flex flex-col items-center gap-8 w-full mb-8">
            <UInput
              v-model="username"
              icon="i-solar-user-bold"
              placeholder="请输入用户名"
              class="w-full"
              size="xl"
              color="indigo"
            ></UInput>
            <UInput
              v-model="password"
              icon="i-solar-lock-bold"
              placeholder="请输入密码"
              type="password"
              class="w-full"
              size="xl"
              color="indigo"
            ></UInput>
          </div>
          <div class="w-full flex justify-center">
            <ZyButton
              class="w-full"
              @click="login"
              >{{ $t('common.login') }}</ZyButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const router = useRouter();
  const username = ref('');
  const password = ref('');

  // 登录
  const login = async () => {
    const { data } = await ApiUser.login({
      username: username.value,
      password: password.value,
    });
    if (data.value.code === 0) {
      // 登录成功
      store.useAuthStore().setToken(data.value.data.token);
      store.useAuthStore().setUser({
        id: data.value.data.user_id,
        username: data.value.data.user_name,
        email: data.value.data.user_email,
        avatar: data.value.data.user_avatar,
        nickname: data.value.data.user_nick_name,
      });
      await router.replace('/admin');
    }
  };
</script>

<template>
  <div>
    <div @click="isOpen = true">
      <slot />
    </div>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              访问加密内容
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>
        <!--        <p>当前{{ type }} id为{{ id }}，需要密码访问，请输入密码</p>-->
        <div v-loading="loading">
          <UInput v-model="password" icon="i-solar-lock-password-bold" placeholder="请输入密码" type="password" class="w-full"
            size="xl" color="theme"></UInput>
        </div>

        <template #footer>
          <div class="flex items-center justify-end space-x-2">
            <ZyButton :loading="loading" @click="verifyPassword()">确认</ZyButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import { sleep } from "~/utils";

const props = defineProps({
  type: {
    type: String,
    default: "article",
  },
  id: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["validateSuccess"]);

const loading = ref(false);
const isOpen = ref(false);
const password = ref("");

const verifyPassword = async () => {
  if (password.value.trim() === "") {
    window.ZyToast({
      title: "密码不能为空",
      text: "请输入正确的密码，才能访问这篇文章",
    })
    return;
  }
  loading.value = true;
  const { data } = await ApiArticle.passwordVerify({
    password: password.value,
    id: props.id,
  });
  await sleep(400);
  loading.value = false;
  if (data.value.code === 0) {
    window.ZyToast({
      title: "密码正确",
      text: "密码正确，您现在可以访问这篇文章",
    })
    emit("validateSuccess", { password: password.value });
    isOpen.value = false;
  }
};
</script>

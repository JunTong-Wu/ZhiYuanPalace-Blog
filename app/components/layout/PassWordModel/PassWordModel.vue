<template>
  <div>
    <div @click="isOpen = true">
      <slot />
    </div>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              访问加密内容
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <!--        <p>当前{{ type }} id为{{ id }}，需要密码访问，请输入密码</p>-->
        <div v-loading="loading">
          <UInput
            v-model="password"
            icon="i-ri-lock-password-fill"
            placeholder="请输入密码"
            type="password"
            class="w-full"
            size="xl"
            color="theme"
          ></UInput>
        </div>

        <template #footer>
          <div class="flex items-center justify-end space-x-2">
            <ZyButton :loading="loading" @click="verifyPassword()"
              >确认</ZyButton
            >
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
const snackbar = useSnackbar();

const verifyPassword = async () => {
  if (password.value.trim() === "") {
    snackbar.add({
      type: "warning",
      text: "密码不能为空",
    });
    return;
  }
  loading.value = true;
  const data = await ApiArticle.articles_password_verify({
    password: password.value,
    id: props.id,
  });
  await sleep(400);
  loading.value = false;
  if (data.code === 0) {
    snackbar.add({
      type: "success",
      text: "密码正确，可以访问文章",
    });
    emit("validateSuccess", { password: password.value });
    isOpen.value = false;
  } else {
    snackbar.add({
      type: "warning",
      text: "密码错误，不能访问文章",
    });
  }
};
</script>

<template>
  <div
    class="pt-8 xs:pt-10 sm:pt-12 md:pt-14 lg:pt-16 pb-40"
    :class="{
      dark: dark,
    }"
  >
    <div>
      <slot />
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <img
            class="h-96 w-full"
            src="@/assets/image/illustrations/4.png"
            alt=""
          />
          <h3 class="text-2xl text-text-3 font-bold">
            {{ getVerifyApi.outsideTips }}
          </h3>
        </div>
        <div
          class="flex justify-center items-center mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16"
        >
          <ZyButton @click="isOpen = true">输入密码</ZyButton>
        </div>
      </div>
    </div>
    <UModal
      v-model="isOpen"
      :class="{
        dark: dark,
      }"
    >
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
            icon="i-solar-lock-password-bold"
            placeholder="请输入密码"
            type="password"
            class="w-full"
            color="theme"
          ></UInput>
        </div>

        <template #footer>
          <div class="flex items-center justify-end space-x-2">
            <ZyButton
              :loading="loading"
              @click="verifyPassword()"
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

  type VerifyType = "article" | "album" | "video";
  const props = defineProps({
    type: {
      type: Object as () => VerifyType | null,
      default: "article",
    },
    id: {
      type: Number,
      default: 0,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["validateSuccess"]);

  const loading = ref(false);
  const isOpen = ref(false);
  const password = ref("");

  const getVerifyApi = computed(() => {
    let params: any = {
      api: undefined,
      outsideTips: "",
      failTips: "",
      successTips: "",
    };
    switch (props.type) {
      case "article":
        params = {
          api: ApiArticle.passwordVerify,
          outsideTips: "该文章被密码保护",
          failTips: "请输入正确的密码，才能访问这篇文章",
          successTips: "密码正确，您现在可以访问这篇文章",
        };
        break;
      case "album":
        params = {
          api: ApiPhotos.passwordVerify,
          outsideTips: "该相册被密码保护",
          failTips: "请输入正确的密码，才能访问这个相册",
          successTips: "密码正确，您现在可以访问这个相册",
        };
        break;
      case "video":
        params = {
          api: ApiVideo.passwordVerify,
          outsideTips: "该视频被密码保护",
          failTips: "请输入正确的密码，才能访问这个视频",
          successTips: "密码正确，您现在可以访问这个视频",
        };
      default:
        // eslint-disable-next-line no-case-declarations
        // @ts-ignore
        const n: never = props.type;
        console.log(n);
        break;
    }
    return params;
  });

  const verifyPassword = async () => {
    if (password.value.trim() === "") {
      window.ZyToast({
        title: "密码不能为空",
        text: getVerifyApi.value.failTips,
      });
      return;
    }
    loading.value = true;
    const { data } = await getVerifyApi.value.api({
      password: password.value,
      id: props.id,
    });
    await sleep(400);
    loading.value = false;
    if (data.value.code === 0) {
      window.ZyToast({
        title: "密码正确",
        text: getVerifyApi.value.successTips,
      });
      emit("validateSuccess", { password: password.value });
      isOpen.value = false;
    }
  };
</script>

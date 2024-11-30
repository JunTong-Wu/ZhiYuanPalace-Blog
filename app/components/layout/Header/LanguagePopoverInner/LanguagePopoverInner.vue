<template>
  <div class="text-text-1 w-40">
    <ul>
      <li v-for="(lang, index) in supportedLangs" :key="index" @click="changeLanguage(lang)" :class="{
        'border-b border-solid border-borderColor':
          index < availableLocales.length - 1,
      }">
        <label
          class="language-switch-label w-full flex justify-between p-4 h-14 hover:bg-theme-500 hover:text-white cursor-pointer">
          <span class="text-sm">{{ t(`language.${lang}`) }}</span>
          <UIcon v-if="lang == locale" name="i-fluent-checkmark-12-regular" class="w-6 h-6 text-theme-500" />
        </label>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, t, availableLocales } = useI18n();

const supportedLangs = ref(availableLocales);

const changeLanguage = (lang: string) => {
  locale.value = lang;
};

</script>
<style lang="scss">
label.language-switch-label {
  &:hover {
    .iconify {
      color: #ffffff;
    }
  }
}
</style>
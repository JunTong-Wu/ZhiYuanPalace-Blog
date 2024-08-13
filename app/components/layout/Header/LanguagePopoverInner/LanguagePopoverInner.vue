<template>
  <div class="text-text-1 w-40">
    <ul>
      <li
        v-for="(lang, index) in availableLocales"
        :key="lang.code"
        :to="switchLocalePath(lang.code)"
        @click="switchLanguage(lang.code, lang.iso)"
        :class="{
          'border-b border-solid border-borderColor':
            index < availableLocales.length - 1,
        }"
      >
        <label
          class="w-full flex justify-between p-4 h-14 hover:bg-theme-500 hover:text-white cursor-pointer"
        >
          <span class="text-sm">{{ lang.name }}</span>
          <input
            type="radio"
            name="lang"
            :checked="lang.code == locale"
            class="hidden"
          />
        </label>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const { locale, locales, setLocale } = useI18n() as any;
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value;
});

const switchLanguage = (code: any, iso: any) => {
  setLocale(code);
  document.documentElement.lang = iso;
};
</script>

<template>
  <footer
    class="zy-footer-navigation h-footer flex justify-center landscape:hidden"
  >
    <div
      class="h-full flex mx-auto w-full xs:w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]"
    >
      <ZyLink
        v-for="n in linkList"
        :key="String(n.name)"
        :to="`${n.path}`"
        :title="$t(`menu.${String(n.name)}`)"
        class="h-full justify-center w-[20%]"
      >
        <div
          v-zy-ripple
          class="px-6 py-2 rounded-full"
          :class="[
            isActivateRootRouter(route, n.path)
              ? 'bg-theme-50 dark:bg-theme-700'
              : '',
          ]"
        >
          <ZyIcon
            size="1.3rem"
            :defaultName="n.meta?.defaultIcon"
            defaultColor="var(--text-1)"
            :activatedName="n.meta?.activatedIcon"
            :activated="isActivateRootRouter(route, n.path)"
            activatedColor="var(--text-1)"
          />
        </div>
      </ZyLink>
    </div>
  </footer>
</template>
<script setup lang="ts">
  import "./transition.scss";
  const linkList = getNavigationMapForVisitorMenu();
  const route = useRoute();
</script>

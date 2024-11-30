
<template>
  <UAccordion multiple :items="linkList" :ui="{ wrapper: 'flex flex-col w-full gap-2' }">
    <template #default="{ item, index, open }">
      <div v-if="!item.children" class="rounded-xs hover:bg-background"
        :class="[isActivateRouter(route, item.path) ? 'bg-level-1 an-beat text-text-1' : '']" @click.prevent>
        <ZyLink v-zy-ripple :to="`${item.path}`" :title="$t(`menu.${String(item.name)}`)"
          class="py-4 rounded-xs w-full flex-col justify-center pl-3"
          :class="[isActivateRouter(route, item.path) ? 'text-text-1' : 'text-text-2']">
          <div class="w-full flex items-center gap-2 relative">
            <ZyIcon size="1.5rem" :defaultName="item.meta?.defaultIcon" defaultColor="var(&#45;&#45;text-2)"
              :activatedName="item.meta?.activatedIcon" :activated="isActivateRouter(route, item.path)"
              activatedColor="var(&#45;&#45;text-1)" />
            <span class="text-sm">{{ $t(`menu.${String(item.name)}`) }}</span>
          </div>
        </ZyLink>
      </div>
      <UButton v-else variant="ghost" class="py-4 rounded-xs bg-transparent hover:bg-background text-sm"
        :class="[isActivateRootRouter(route, item.path) ? 'text-text-1' : 'text-text-2']">
        <template #leading>
          <ZyIcon size="1.5rem" :defaultName="item.meta?.defaultIcon" defaultColor="var(&#45;&#45;text-2)"
            :activatedName="item.meta?.activatedIcon" :activated="isActivateRootRouter(route, item.path)"
            activatedColor="var(&#45;&#45;text-1)" />
        </template>
        <span class="ml-1">{{ $t(`menu.${String(item.name)}`) }}</span>
        <template #trailing>
          <UIcon name="i-heroicons-chevron-right-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
        </template>
      </UButton>
    </template>
    <template #item="{ item }">
      <ul v-if="item.children" class="flex flex-col w-full gap-2">
        <li v-for="children in item.children" class="rounded-xs h-14 flex hover:bg-background"
          :class="[isActivateRouter(route, children.path) ? 'bg-level-1 an-beat' : '']">
          <ZyLink v-zy-ripple :to="`${children.path}`" :title="$t(`menu.${String(children.name)}`)"
            class="rounded-xs w-full flex-col justify-center pl-3 text-sm"
            :class="[isActivateRouter(route, children.path) ? 'text-text-2' : 'text-text-3']">
            <div class="w-full flex items-center gap-2 relative">
              <ZyIcon size="1.5rem" :defaultName="children.meta?.defaultIcon" defaultColor="var(&#45;&#45;text-3)"
                :activatedName="children.meta?.activatedIcon" :activated="isActivateRouter(route, children.path)"
                activatedColor="var(&#45;&#45;text-2)" />
              <span>{{ $t(`menu.${String(children.name)}`) }}</span>
            </div>
          </ZyLink>
        </li>

      </ul>

    </template>
  </UAccordion>
</template>
<script setup lang="ts">
const emit = defineEmits(['change']);

const linkList = getNavigationMapForAdminMenu() as any;
const route = useRoute();

const setDefaultOpen = () => {
  linkList.forEach((item: any) => {
    if (item.children) {
      item.defaultOpen = true;
      return;
    }
  })
}
setDefaultOpen();

watch(() => route.path, (newVal) => {
  emit('change');
})

</script>

<style lang="scss" scoped>
.an-beat {
  animation: beat 1s ease-out;
}

@keyframes beat {
  0% {
    transform: translateY(0%) rotate(15deg) scale(0.8);
  }

  25% {
    transform: translateY(-30%);
  }

  50% {
    transform: translateY(10%);
  }

  75% {
    transform: translateY(-20%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>

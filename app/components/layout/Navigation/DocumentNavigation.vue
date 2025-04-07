<template>
  <UAccordion
    multiple
    :items="linkList"
    :ui="{ wrapper: 'flex flex-col w-full gap-2' }"
  >
    <template #default="{ item, index, open }">
      <div
        v-if="!item.children"
        class="rounded-xs hover:bg-background"
        :class="[
          isActivateRootRouter(route, item.path)
            ? 'bg-level-1 dark:bg-level-2 an-beat text-text-1'
            : '',
        ]"
        @click.prevent
      >
        <ZyLink
          v-zy-ripple
          :to="`${item.path}`"
          :title="$t(`menu.${String(item.name)}`)"
          class="py-4 rounded-xs w-full flex-col justify-center pl-5"
          :class="[
            isActivateRootRouter(route, item.path)
              ? 'text-text-1'
              : 'text-text-2',
          ]"
        >
          <div class="w-full flex items-center gap-2 relative">
            <ZyIcon
              class="flex-none"
              size="1.5rem"
              :defaultName="item.meta?.defaultIcon"
              defaultColor="var(&#45;&#45;text-2)"
              :activatedName="item.meta?.activatedIcon"
              :activated="isActivateRootRouter(route, item.path)"
              activatedColor="var(&#45;&#45;text-1)"
            />
            <span
              class="text-sm transition-all line-clamp-1"
              :class="{
                'opacity-100 w-32': !hide,
                'opacity-0 w-0': hide,
              }"
              >{{ $t(`menu.${String(item.name)}`) }}</span
            >
          </div>
        </ZyLink>
      </div>
      <UButton
        v-else
        variant="ghost"
        class="py-4 rounded-xs bg-transparent hover:bg-background text-sm pl-5"
        :class="[
          isActivateRootRouter(route, item.path)
            ? '!text-text-2'
            : '!text-text-2',
        ]"
      >
        <template #leading>
          <ZyIcon
            class="flex-none"
            size="1.5rem"
            :defaultName="item.meta?.defaultIcon"
            defaultColor="var(&#45;&#45;text-2)"
            :activatedName="item.meta?.activatedIcon"
            :activated="isActivateRootRouter(route, item.path)"
            activatedColor="var(&#45;&#45;text-2)"
          />
        </template>
        <span
          class="text-start text-sm transition-all line-clamp-1"
          :class="{
            'opacity-100 w-32': !hide,
            'opacity-0 w-0': hide,
          }"
          >{{ $t(`menu.${String(item.name)}`) }}</span
        >
        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>
    <template #item="{ item }">
      <ul
        v-if="item.children"
        class="flex flex-col w-full gap-2"
      >
        <li
          v-for="children in item.children"
          class="rounded-xs h-14 flex hover:bg-background"
          :class="[
            isActivateRootRouter(route, children.path)
              ? 'bg-level-1 dark:bg-level-2 an-beat'
              : '',
          ]"
        >
          <ZyLink
            v-zy-ripple
            :to="`${children.path}`"
            :title="$t(`menu.${String(children.name)}`)"
            class="rounded-xs w-full flex-col justify-center pl-5 text-sm"
            :class="[
              isActivateRootRouter(route, children.path)
                ? 'text-text-1'
                : 'text-text-2',
            ]"
          >
            <div class="w-full flex items-center gap-2 relative">
              <ZyIcon
                class="flex-none"
                size="1.5rem"
                :defaultName="children.meta?.defaultIcon"
                defaultColor="var(&#45;&#45;text-2)"
                :activatedName="children.meta?.activatedIcon"
                :activated="isActivateRootRouter(route, children.path)"
                activatedColor="var(&#45;&#45;text-1)"
              />
              <span
                class="transition-all line-clamp-1"
                :class="{
                  'opacity-100 w-32': !hide,
                  'opacity-0 w-0': hide,
                }"
                >{{ $t(`menu.${String(children.name)}`) }}</span
              >
            </div>
          </ZyLink>
        </li>
      </ul>
    </template>
  </UAccordion>
</template>
<script setup lang="ts">
  const props = defineProps({
    hide: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["change"]);

  const linkList = getNavigationMapForDocMenu();
  const route = useRoute();

  const setDefaultOpen = () => {
    linkList.forEach((item: any) => {
      if (item.children) {
        item.defaultOpen = true;
        return;
      }
    });
  };
  setDefaultOpen();

  watch(
    () => route.path,
    (newVal) => {
      emit("change");
    },
  );
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

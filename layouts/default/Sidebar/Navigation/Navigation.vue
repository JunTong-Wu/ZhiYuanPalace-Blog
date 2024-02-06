<template>
  <nav p-2>
    <ul>
      <li v-for="n in linkList" h-14 flex mb-2>
        <zy-link
          :to="`/${locale}${n.path}`"
          w-full
          :title="$t(n.title)"
          px-4
          class="sidebar-navigation"
          rounded-lg
          :class="{ activate: routerActivate(n.path) }"
        >
          <div w-7 flex justify-center>
            <ZyIcon
              size="1.25rem"
              :lineName="n.lineIcon"
              lineColor="var(--text-3)"
              :filledName="n.filledIcon"
              :filled="routerActivate(n.path)"
              filled-color="var(--primary-6)"
            />
          </div>

          <span ml-2 text-sm>{{ $t(n.title) }}</span>
        </zy-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
const linkList = getNavigationMap();

const route = useRoute();
const { locale } = useI18n();
const routerActivate = (path: string) => {
  if (path != "/") {
    if (route.path.includes(path)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      route.path == "/" ||
      route.path == `/${locale.value}` ||
      route.path == `/${locale.value}/`
    ) {
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar-navigation {
  overflow: hidden;
  > div {
    flex: none;
  }
  > span {
    white-space: nowrap;
  }
  &.activate {
    background-color: var(--bg-3);
  }
}

@media (max-width: 1200px) {
  .sidebar-navigation {
    span {
      display: none;
    }
  }
}
</style>

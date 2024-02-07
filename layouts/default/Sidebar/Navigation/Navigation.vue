<template>
  <nav p-2>
    <ul>
      <li v-for="n in linkList" h-14 flex mb-2>
        <zy-link
          :to="`${n.path}`"
          w-full
          :title="$t(n.title)"
          px-4
          class="sidebar-navigation"
          rounded-lg
          :class="{ activate: routerActivate(n.path) }"
        >
          <div w-7 flex justify-center>
            <ZyIcon
              size="1.5rem"
              :defaultName="n.defaultIcon"
              defaultColor="var(--text-4)"
              :activatedName="n.activatedIcon"
              :activated="routerActivate(n.path)"
              activated-color="var(--primary-3)"
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
const routerActivate = (path: string) => {
  if (path != "/") {
    if (route.path.includes(path)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (route.path == "/") {
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

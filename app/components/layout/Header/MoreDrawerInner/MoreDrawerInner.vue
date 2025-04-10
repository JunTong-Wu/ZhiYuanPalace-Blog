<template>
  <div class="p-4">
    <div class="bg-level-3 rounded text-text-1">
      <ul>
        <li class="">
          <ZyLink
            to="/admin"
            type="push"
            class="flex items-center justify-between w-full !p-4"
            @click="closeDrawer"
          >
            <div class="flex items-center gap-4">
              <div
                class="relative w-10 h-10 overflow-hidden rounded-full bg-level-b1"
              >
                <svg
                  class="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="flex items-center gap-4">
                <div class="font-medium">
                  <div>登录</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    登录到您的帐户
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ZyIcon
                defaultName="i-solar-alt-arrow-right-linear"
                size="1.25rem"
              />
            </div>
          </ZyLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  const emit = defineEmits(["closeDrawer"]);
  const closeDrawer = () => {
    emit("closeDrawer");
  };
</script>

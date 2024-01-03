<template>
  <div h-100 w-full relative>
    <div
      flex
      flex-col
      items-center
      justify-center
      rounded-xl
      h-full
      text-center
    >
      <img src="@/src/assets/image/logo.png" alt="" w-20 />
      <h2 m-4 text-sm>{{ $t("welcome") }}</h2>
      <p m-0 text-xs>{{ $t("maintenanceLine1") }}</p>
      <p m-0 text-xs>{{ $t("maintenanceLine2") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>

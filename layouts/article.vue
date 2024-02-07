<template>
  <div>
    <main flex-1 pt-header transition-padding bg="bg-transparent">
      <div
        text-base
        overflow-auto
        scroll-view
        class="article-view transition-in"
        p-4
      >
        <slot />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts"></script>

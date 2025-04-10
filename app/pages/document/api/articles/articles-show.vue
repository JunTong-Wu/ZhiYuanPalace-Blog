<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h1>文章详情</h1>
      </div>
    </div>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import Prism from "prismjs";
  onMounted(() => {
    Prism.highlightAll();
  });
  onUpdated(() => {
    Prism.highlightAll();
  });
</script>

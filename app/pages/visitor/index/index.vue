<template>
  <CommonMainSection fullWidth>
    <Welcome />
    <Slogin />
    <AboutMe />
    <Listen />
    <NewPosts />
    <MorePostType />
    <OpenSource />
  </CommonMainSection>
</template>
<script setup lang="ts">
  import Welcome from "./Welcome/Welcome.vue";
  import Slogin from "./Slogin/Slogin.vue";
  import AboutMe from "./AboutMe/AboutMe.vue";
  import Listen from "./Listen/Listen.vue";
  import NewPosts from "./NewPosts/NewPosts.vue";
  import MorePostType from "./MorePostType/MorePostType.vue";
  import OpenSource from "./OpenSource/OpenSource.vue";
</script>

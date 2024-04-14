<script setup lang="ts">
import PostList from '../components/post-list/PostList.vue'
import ActionsList from '../components/actions-list/ActionsList.vue'
</script>

<template>
  <main id="home-view-content">
    <div class="container mx-auto px-4 py-8 grid grid-cols-2 gap-x-24">
      <PostList />
      <ActionsList />
    </div>
    <div class="bg-gray" id="home-bg-rectangle-wrap">
      <div class="bg-purple" id="home-bg-rectangle" />
    </div>
  </main>
</template>

<style scoped>
#home-view-content {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

#home-bg-rectangle-wrap {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#home-bg-rectangle {
  position: relative;
  top: -15%;
  left: -10%;
  width: 140%;
  height: 25%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  rotate: -10deg;
  z-index: -1;
}
</style>

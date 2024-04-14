<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePostStore } from '../../stores/posts'
import PostItem from './PostItem.vue'

const store = usePostStore()

const updateOrder = (fromIndex: number, toIndex: number, postId: number) => {
  const postsIds = store.lastPostOrder.map((post) => post.id)
  const [movedPost] = postsIds.splice(fromIndex, 1)
  postsIds.splice(toIndex, 0, movedPost)
  store.updateOrderAction({ order: postsIds, fromIndex, toIndex, postId })
}

onBeforeMount(() => {
  store.fetchPosts()
})
</script>

<template>
  <main>
    <h1 class="text-white text-2xl mb-4">Sortable Post List</h1>
    <TransitionGroup name="list" tag="ul">
      <li v-for="(post, index) in store.lastPostOrder" :key="post.id">
        <PostItem
          :postId="post.id"
          :postIndex="index"
          :postsLength="store.lastPostOrder.length"
          :onPostClick="updateOrder"
        />
      </li>
    </TransitionGroup>
  </main>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>

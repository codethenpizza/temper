<script setup lang="ts">
import { usePostStore } from '../../stores/posts'

defineProps<{
  orderAction: PostsOrderAction
}>()

const store = usePostStore()
</script>

<template>
  <div class="bg-white p-4 flex justify-between items-center">
    <h4 class="text-gray-600">
      Moved post {{ orderAction.postId }} from index {{ orderAction.fromIndex }} to index
      {{ orderAction.toIndex }}
    </h4>
    <button
      @click="store.removeOrderAction(orderAction.timestamp)"
      class="bg-green hover:bg-dark-green rounded py-3 px-5"
    >
      Time Travel
    </button>
  </div>
</template>

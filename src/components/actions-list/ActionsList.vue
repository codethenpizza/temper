<script setup lang="ts">
import { usePostStore } from '../../stores/posts'
import CardItem from '../card-item/CardItem.vue'
import ActionItem from './ActionItem.vue'

const store = usePostStore()
</script>

<template>
  <CardItem class="bg-gray">
    <div class="bg-white w-full rounded-t-md">
      <h1 class="text-black text-2xl px-6 py-8">List of actions committed</h1>
    </div>
    <CardItem class="p-6">
      <TransitionGroup name="list" tag="ul" class="divide-y divide-gray rounded-md">
        <li v-for="action in store.orderActionsSorted" :key="action.timestamp">
          <ActionItem :orderAction="action" />
        </li>
      </TransitionGroup>
    </CardItem>
  </CardItem>
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

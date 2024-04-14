<script setup lang="ts">
import { computed } from 'vue'
import CardItem from '../card-item/CardItem.vue'
import ArrowIcon from '../arrow-icon/ArrowIcon.vue'

const props = defineProps<{
  postId: number
  postIndex: number
  postsLength: number
  onPostClick: (fromIndex: number, toIndex: number, postId: number) => void
}>()

const isFirstPost = computed(() => props.postIndex === 0)

const isLastPost = computed(() => props.postIndex === props.postsLength - 1)

const onUpClick = () => {
  if (isFirstPost.value) return
  props.onPostClick(props.postIndex, props.postIndex - 1, props.postId)
}

const onDownClick = () => {
  if (isLastPost.value) return
  props.onPostClick(props.postIndex, props.postIndex + 1, props.postId)
}
</script>

<template>
  <CardItem class="mb-4 p-4 bg-white h-24 flex items-center">
    <h2 class="flex-1 text-lg font-semibold font-normal">Post {{ postId }}</h2>
    <div
      class="h-full flex flex-col"
      :class="[isFirstPost || isLastPost ? 'justify-center' : 'justify-between']"
    >
      <button
        v-if="!isFirstPost"
        @click="onUpClick"
        class="arrow-up-button mx-2 text-purple hover:scale-125"
      >
        <ArrowIcon />
      </button>
      <button
        v-if="!isLastPost"
        @click="onDownClick"
        class="arrow-down-button mx-2 text-purple hover:scale-125"
      >
        <ArrowIcon class="rotate-180" />
      </button>
    </div>
  </CardItem>
</template>

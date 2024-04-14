import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

// keep list state per action to be able to reset it to any previous state
export type PostsOrderAction = {
  // order of the posts
  order: number[]

  // post id that was moved
  postId: number

  // index of the post that was moved
  fromIndex: number

  // index of the post that was moved to
  toIndex: number

  // timestamp to keep track of the order
  // also for the demo purpose we can use this as unique id
  timestamp: number
}

export const usePostStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const orderActions = ref<PostsOrderAction[]>([])

  /**
   * fetch posts from the API
   */
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      // I prefer not to load more than we need,
      // but as fake api do not have pagination, we will load all and slice
      const allPosts = await response.json()

      posts.value = allPosts.slice(0, 5)
    } catch (error) {
      console.error(error)
      posts.value = []
    }
  }

  /**
   * sort posts by a given order
   */
  const sortPosts = (posts: Post[], order: number[]): Post[] => {
    return order.map((id) => posts.find((post) => post.id === id) as Post)
  }

  /**
   * return the last order by timestamp
   */
  const lastOrderAction = computed((): PostsOrderAction | null => {
    if (!orderActions.value.length) {
      return null
    }
    return orderActions.value.reduce((last, current) => {
      return last.timestamp > current.timestamp ? last : current
    })
  })

  /**
   * get the last post order
   */
  const lastPostOrder = computed((): Post[] => {
    if (!lastOrderAction.value) {
      return posts.value
    }
    return sortPosts(posts.value, lastOrderAction.value.order)
  })

  /**
   * list of order actions sorted by timestamp
   * with new at the beginning
   */
  const orderActionsSorted = computed(() => {
    return orderActions.value.slice().sort((a, b) => b.timestamp - a.timestamp)
  })

  /**
   * update the order of the posts
   */
  const updateOrderAction = (payload: Omit<PostsOrderAction, 'timestamp'>) => {
    orderActions.value.push({
      ...payload,
      timestamp: Date.now()
    })
  }

  /**
   * filter out the order action by timestamp including the timestamp
   */
  const removeOrderAction = (timestamp: number) => {
    orderActions.value = orderActions.value.filter((order) => order.timestamp < timestamp)
  }

  return {
    posts,
    fetchPosts,
    lastPostOrder,

    // order actions
    orderActions,
    orderActionsSorted,
    updateOrderAction,
    removeOrderAction
  }
})

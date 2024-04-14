import { describe, test, beforeEach, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostStore } from '../posts'

describe('Posts store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('should return posts sorted as last order action', async () => {
    const store = usePostStore()
    store.$patch({
      posts: [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' }
      ],
      orderActions: [
        {
          order: [3, 1, 2],
          fromIndex: 1,
          toIndex: 2,
          postId: 999,
          timestamp: 1
        },
        {
          order: [2, 3, 1],
          fromIndex: 0,
          toIndex: 1,
          postId: 999,
          timestamp: 2
        }
      ]
    })

    const currentOrderId = store.lastPostOrder.map(({ id }) => id)
    expect(currentOrderId).toEqual([2, 3, 1])
  })

  test('should store order action when commited', () => {
    const store = usePostStore()
    store.updateOrderAction({
      order: [1, 2, 3],
      fromIndex: 1,
      toIndex: 2,
      postId: 999
    })

    expect(store.orderActions).toHaveLength(1)
  })

  test('should remove order action when committed including actons previos', () => {
    const store = usePostStore()
    store.$patch({
      orderActions: [
        {
          order: [1, 2, 3],
          fromIndex: 1,
          toIndex: 2,
          postId: 999,
          timestamp: 1
        },
        {
          order: [1, 2, 3],
          fromIndex: 1,
          toIndex: 2,
          postId: 999,
          timestamp: 2
        },
        {
          order: [1, 2, 3],
          fromIndex: 1,
          toIndex: 2,
          postId: 999,
          timestamp: 3
        }
      ]
    })

    store.removeOrderAction(2)
    expect(store.orderActions).toHaveLength(1)
    expect(store.orderActions[0].timestamp).toBe(1)
  })

  test('should return the order actions sorted by timestamp', () => {
    const store = usePostStore()
    store.$patch({
      orderActions: [
        {
          order: [1, 2, 3],
          fromIndex: 1,
          toIndex: 2,
          postId: 999,
          timestamp: 1
        },
        {
          order: [1, 2, 3],
          fromIndex: 1,
          toIndex: 2,
          postId: 999,
          timestamp: 2
        }
      ]
    })

    expect(store.orderActionsSorted.map(({ timestamp }) => timestamp)).toEqual([2, 1])
  })
})

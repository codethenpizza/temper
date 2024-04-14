import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import PostItem from '../PostItem.vue'

describe('PostItem', () => {
  it('renders properly', () => {
    const wrapper = mount(PostItem, {
      props: {
        postId: 1,
        postIndex: 1,
        postsLength: 5,
        onPostClick: () => {}
      }
    })
    expect(wrapper.text()).toContain('Post 1')
  })

  it('should emit onPostClick when clicked on arrow', async () => {
    const onPostClick = vi.fn()
    const wrapper = mount(PostItem, {
      props: {
        postId: 1,
        postIndex: 1,
        postsLength: 5,
        onPostClick
      }
    })

    await wrapper.find('.arrow-up-button').trigger('click')
    expect(onPostClick).toHaveBeenCalledWith(1, 0, 1)
    expect(onPostClick).toHaveBeenCalledTimes(1)

    await wrapper.find('.arrow-down-button').trigger('click')
    expect(onPostClick).toHaveBeenCalledWith(1, 2, 1)
    expect(onPostClick).toHaveBeenCalledTimes(2)
  })
})

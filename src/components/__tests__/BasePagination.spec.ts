import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BasePagination from '@/components/base/BasePagination.vue';

describe('BasePagination.vue', () => {
  it('renders correctly with initial props', () => {
    const wrapper = mount(BasePagination, {
      props: {
        totalPages: 5,
        modelValue: 3,
      },
    });

    const buttons = wrapper.findAll('.pagination__button');
    expect(buttons).toHaveLength(2);
    expect(wrapper.text()).toContain('3 / 5');
    expect(buttons[0].attributes('disabled')).toBeUndefined();
    expect(buttons[1].attributes('disabled')).toBeUndefined();
  });

  it('disables backward button on first page', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        totalPages: 5,
        modelValue: 1,
      },
    });

    const buttons = wrapper.findAll('.pagination__button');
    expect(buttons[0].attributes('disabled')).toBe('');
    expect(buttons[1].attributes('disabled')).toBeUndefined();
  });

  it('disables forward button on last page', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        totalPages: 5,
        modelValue: 5,
      },
    });

    const buttons = wrapper.findAll('.pagination__button');
    expect(buttons[1].attributes('disabled')).toBe('');
    expect(buttons[0].attributes('disabled')).toBeUndefined();
  });

  it('increments and decrements the page value correctly', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        totalPages: 5,
        modelValue: 2,
      },
    });

    const buttons = wrapper.findAll('.pagination__button');
    const goForwardButton = buttons[1];
    const goBackwardsButton = buttons[0];

    await goForwardButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([3]);

    await goBackwardsButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([2]);
  });
});

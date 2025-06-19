import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseTableSearch from '@/components/base/BaseTableSearch.vue';

describe('BaseTableSearch', () => {
  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseTableSearch, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);

    await input.setValue('hello');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello']);
  });
});

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseTableCell from '@/components/base/BaseTableCell.vue';
import type { Column } from '@/interfaces/InputDefinition';
import { get } from 'lodash';

describe('BaseTableCell', () => {
  const ROW = { name: 'Luke Skywalker', id: 1, created: new Date(), edited: new Date(), url: '' };

  const COLUMN: Column<unknown> = {
    label: 'Name',
    name: 'name',
    valueTransform: (row: unknown) => String(get(row, 'name')).toUpperCase(),
  };

  it('renders the value correctly', () => {
    const wrapper = mount(BaseTableCell, {
      props: {
        column: COLUMN,
        row: ROW,
      },
    });

    expect(wrapper.text()).toContain('LUKE SKYWALKER');
    expect(wrapper.attributes('data-label')).toBe('Name');
    expect(wrapper.attributes('aria-label')).toBe('LUKE SKYWALKER');
  });

  it('displays fallback for missing data', () => {
    const wrapper = mount(BaseTableCell, {
      props: {
        column: { name: 'originWorld', label: 'Origin World' },
        row: ROW,
      },
    });

    expect(wrapper.text()).toContain('--');
    expect(wrapper.attributes('aria-label')).toBe('No data');
  });

  it('handles a column without valueTransform', () => {
    const wrapper = mount(BaseTableCell, {
      props: {
        column: { ...COLUMN, valueTransform: undefined },
        row: ROW,
      },
    });

    expect(wrapper.text()).toContain('Luke Skywalker');
    expect(wrapper.attributes('data-label')).toBe('Name');
    expect(wrapper.attributes('aria-label')).toBe('Luke Skywalker');
  });
});

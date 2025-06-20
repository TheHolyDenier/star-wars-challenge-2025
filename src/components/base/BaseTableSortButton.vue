<script setup lang="ts" generic="T extends BaseEntity">
import { type PropType } from 'vue';
import type { Column } from '@/interfaces/InputDefinition.ts';
import type { BaseEntity } from '@/features/BaseEntity.ts';
import type { Order } from '@/types/Order';

defineProps<{
  column: Column<T>;
}>();

const page = defineModel('page', { type: Number, required: true });
const sort = defineModel('sort', { type: String, required: true });
const order = defineModel('order', { type: String as PropType<Order>, required: true });

const toggleSort = (column: Column<T>) => {
  if (sort.value === column.name) {
    order.value = order.value === 'asc' ? 'desc' : 'asc';
    page.value = 1;
    return;
  }
  sort.value = column.name;
  order.value = 'asc';
  page.value = 1;
};
</script>

<template>
  <button
    :aria-label="`Sorted by ${column.label} in ${order === 'asc' ? 'ascending' : 'descending'} order`"
    :aria-pressed="sort === column.name ? 'true' : 'false'"
    class="sort-button button--transparent"
    tabindex="0"
    type="button"
    @click="toggleSort(column)"
  >
    {{ column.label }}
    <span v-if="sort === column.name">
      {{ order === 'asc' ? '▲' : '▼' }}
    </span>
    <span v-else>⇅</span>
  </button>
</template>

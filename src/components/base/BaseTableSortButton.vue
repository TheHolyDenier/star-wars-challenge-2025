<script setup lang="ts" generic="T extends BaseEntity">
import { type PropType } from 'vue';
import type { Column } from '@/interfaces/InputDefinition.ts';
import type { BaseEntity } from '@/features/BaseEntity.ts';
import type { Order } from '@/types/Order';

const props = defineProps<{
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
    class="sort-button"
    type="button"
    @click="toggleSort(column)"
    :aria-pressed="sort === column.name ? 'true' : 'false'"
    :aria-label="`Sorted by ${column.label} in ${order === 'asc' ? 'ascending' : 'descending'} order`"
    tabindex="0"
  >
    {{ column.label }}
    <span v-if="sort === column.name">
      {{ order === 'asc' ? '▲' : '▼' }}
    </span>
    <span v-else>⇅</span>
  </button>
</template>

<style scoped lang="scss">
.sort-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  text-transform: inherit;
}
</style>

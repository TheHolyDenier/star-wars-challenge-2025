<script setup lang="ts" generic="T extends BaseEntity">
import { computed, shallowRef, watch } from 'vue';
import type { Column } from '@/interfaces/InputDefinition.ts';
import BaseTableCell from '@/components/base/BaseTableCell.vue';
import type { BaseEntity } from '@/features/BaseEntity.ts';
import BasePagination from '@/components/base/BasePagination.vue';
import BaseTableSearch from '@/components/base/BaseTableSearch.vue';
import { useTable } from '@/shared/table';
import { useRoute, useRouter } from 'vue-router';
import { useRouteQuery } from '@vueuse/router';
import type { Order } from '@/types/Order';

const { paginate, getTotalPages, filter, sortData } = useTable();
const router = useRouter();
const route = useRoute();

const props = withDefaults(
  defineProps<{
    columns: Column<T>[];
    dataLoader: () => Promise<T[]>;
    searchBy?: string[];
    sortBy?: string[];
    defaultSort?: string;
  }>(),
  { searchBy: () => ['name'], sortBy: () => ['name', 'created'], defaultSort: 'name' },
);

const data = shallowRef<T[]>([]);
const page = useRouteQuery('page', 1, { router, route });
const search = useRouteQuery('search', '', { router, route });
const sort = useRouteQuery('sort', props.defaultSort, { router, route });
const order = useRouteQuery<Order>('order', 'asc', { router, route });

const filteredData = computed(() => filter(data.value, search.value, props.searchBy));
const paginatedData = computed<T[]>(
  () => paginate(sortData(filteredData.value, sort.value, order.value), page.value) as T[],
);
const totalPages = computed(() => getTotalPages(filteredData.value));

const loadData = async () => {
  data.value = await props.dataLoader();
};

const toggleSort = (column: Column<T>) => {
  if (!props.sortBy.includes(column.name)) return;

  if (sort.value === column.name) {
    order.value = order.value === 'asc' ? 'desc' : 'asc';
    page.value = 1;
    return;
  }
  sort.value = column.name;
  order.value = 'asc';
  page.value = 1;
};

loadData();

watch(search, () => (page.value = 1));
</script>

<template>
  <BaseTableSearch v-model="search" />
  <table class="table">
    <thead>
      <tr class="table__line table__line--titles">
        <th
          v-for="column of columns"
          :key="column.name"
          class="table__title"
          :class="{ 'table__title--sortable': sortBy.includes(column.name) }"
          @click="toggleSort(column)"
        >
          {{ column.label }}
          <span v-if="sort === column.name">
            {{ order === 'asc' ? '▲' : '▼' }}
          </span>
          <span v-else-if="sortBy.includes(column.name)">⇅</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <div v-if="!paginatedData.length" class="table__no-results">No results found.</div>
      <tr class="table__line" v-for="row in paginatedData" :key="row.id">
        <BaseTableCell
          v-for="column in props.columns"
          :key="column.name"
          :column="column"
          :row="row"
        />
      </tr>
    </tbody>
  </table>
  <BasePagination v-model="page" :total-pages="totalPages" />
</template>

<style scoped lang="scss">
@use '@styles/queries';
@use '@styles/colors';
@use 'sass:color';

.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.7rem;
  overflow: hidden;
  font-size: 1rem;
  table-layout: fixed;

  &__line {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    box-shadow: 0 1px 4px rgba(colors.$white, 0.07);
    border-radius: 0.5rem;
    background: colors.$white;
    overflow: hidden;
    border-bottom: none;
    padding-block-end: 1rem;

    @include queries.tablet {
      display: table-row;
      box-shadow: none;
      border-radius: 0;
      margin-bottom: 0;
      overflow: visible;
      padding-block-end: 0;
      background-color: color.scale(colors.$black, $lightness: 10%);

      &:nth-child(even) .table-cell {
        background-color: color.scale(colors.$black, $lightness: 5%);
      }

      &:hover .table-cell {
        background-color: rgba(color.scale(colors.$black, $lightness: -5%), 0.1);
      }

      &:last-child .table-cell {
        border-bottom: none;
      }
    }

    &--titles {
      display: none;

      @include queries.tablet {
        display: table-row;
        text-transform: uppercase;
        font-size: 0.8rem;
        background: colors.$black;
        padding: 1rem;
      }
    }
  }

  &__title {
    padding: 1rem;

    &--sortable {
      cursor: pointer;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .table__line:active {
      background: color.scale(colors.$accent, $lightness: 40%);
      transition: background 0.12s;

      @include queries.tablet {
        background: color.scale(colors.$black, $lightness: 15%);
      }
    }
  }

  &__no-results {
    padding: 1rem;
    color: colors.$primary;
    width: 100%;
    white-space: nowrap;
  }
}
</style>

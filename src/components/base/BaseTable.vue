<script setup lang="ts" generic="T">
import { computed, ref, shallowRef, watch } from 'vue';
import type { Column } from '@/interfaces/InputDefinition.ts';
import BaseTableCell from '@/components/base/BaseTableCell.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import BaseTableSearch from '@/components/base/BaseTableSearch.vue';
import { useTable } from '@/shared/table';
import { useRoute, useRouter } from 'vue-router';
import { useRouteQuery } from '@vueuse/router';
import type { Order } from '@/types/Order';
import BaseTableSortButton from '@/components/base/BaseTableSortButton.vue';
import BaseLoading from '@/components/base/BaseLoading.vue';
import { get } from 'lodash';

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

const page = useRouteQuery<number>('page', 1, { router, route });
const search = useRouteQuery('search', '', { router, route });
const sort = useRouteQuery('sort', props.defaultSort, { router, route });
const order = useRouteQuery<Order>('order', 'asc', { router, route });

const data = shallowRef<T[]>([]);
const loading = ref(true);

const filteredData = computed(() => filter(data.value, search.value, props.searchBy));
const paginatedData = computed<T[]>(
  () => paginate(sortData(filteredData.value, sort.value, order.value), page.value) as T[],
);
const totalPages = computed(() => getTotalPages(filteredData.value));
const sortByColumns = computed(() =>
  props.columns.filter((column) => props.sortBy.includes(column.name)),
);

const loadData = async () => {
  try {
    data.value = await props.dataLoader();
  } catch {
    console.error('Error loading data');
  } finally {
    loading.value = false;
  }
};

loadData();

watch(search, () => (page.value = 1));
</script>

<template>
  <div class="table-element">
    <BaseTableSearch v-model="search" />
    <BaseLoading v-if="loading" />
    <div v-else>
      <div class="table-element__mobile-sort">
        <BaseTableSortButton
          v-for="column of sortByColumns"
          :key="column.name"
          v-model:order="order"
          v-model:page="page"
          v-model:sort="sort"
          :column="column"
        />
      </div>
      <table class="table">
        <thead>
          <tr class="table__line table__line--titles">
            <th v-for="column of columns" :key="column.name" class="table__title">
              <BaseTableSortButton
                v-if="sortBy.includes(column.name)"
                v-model:order="order"
                v-model:page="page"
                v-model:sort="sort"
                :column="column"
              />
              <span v-else>{{ column.label }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <div v-if="!paginatedData.length" class="table__no-results">No results found.</div>
          <tr class="table__line" v-for="row in paginatedData" :key="get(row, 'id')">
            <BaseTableCell
              v-for="column in props.columns"
              :key="column.name"
              :column="column"
              :row="row"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <BasePagination v-model="page" :total-pages="totalPages" />
  </div>
</template>

<style scoped lang="scss">
@use '@styles/queries';
@use '@styles/colors';
@use 'sass:color';

.table-element {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__mobile-sort {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    padding: 1rem;
    gap: 1rem;

    @include queries.tablet {
      display: none;
    }
  }
}

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

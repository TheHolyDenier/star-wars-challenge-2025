<script setup lang="ts" generic="T extends BaseEntity">
import { computed, ref, shallowRef } from 'vue';
import type { Column } from '@/interfaces/InputDefinition.ts';
import BaseTableCell from '@/components/base/BaseTableCell.vue';
import type { BaseEntity } from '@/features/BaseEntity.ts';
import BasePagination from '@/components/base/BasePagination.vue';

const DISPLAY_PER_PAGE = 10;

const props = defineProps<{
  columns: Column<T>[];
  dataLoader: () => Promise<T[]>;
}>();

const data = shallowRef<T[]>([]);
const page = ref<number>(1);

const paginatedData = computed<T[]>(() => {
  const start = (page.value - 1) * DISPLAY_PER_PAGE;
  const end = start + DISPLAY_PER_PAGE;
  return data.value.slice(start, end);
});
const totalPages = computed(() => Math.max(1, Math.ceil(data.value.length / DISPLAY_PER_PAGE)));

const loadData = async () => {
  data.value = await props.dataLoader();
};

loadData();
</script>

<template>
  <table class="table">
    <thead>
      <tr class="table__line table__line--titles">
        <th v-for="col in props.columns" :key="col.name" class="table__title">
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <div v-if="!data.length" class="table__no-results">No results found.</div>
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

        .table__title {
          padding: 1rem;
        }
      }
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

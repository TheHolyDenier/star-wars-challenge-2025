<script setup lang="ts" generic="T extends BaseEntity">
import { computed } from 'vue';
import type { Column } from '@/interfaces/InputDefinition.ts';
import { get } from 'lodash';
import type { BaseEntity } from '@/features/BaseEntity.ts';

const props = defineProps<{ column: Column<T>; row: T }>();

const value = computed(() =>
  props.column.valueTransform
    ? props.column.valueTransform(props.row)
    : get(props.row, props.column.name),
);
</script>

<template>
  <td class="table-cell" :data-label="column.label" :aria-label="value ?? 'No data'">
    {{ value ?? '--' }}
  </td>
</template>

<style scoped lang="scss">
@use '@styles/queries';
@use '@styles/colors';
@use 'sass:color';

.table-cell {
  display: block;
  position: relative;
  width: 100%;
  padding-inline: 1rem;
  padding-block: 2rem 0;
  min-height: 2.4em;
  border: none;
  background: none;
  box-sizing: border-box;
  font-size: 1em;
  transition: background 0.15s;
  color: colors.$black;

  @include queries.tablet {
    color: colors.$white;
    text-align: center;
  }

  &::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    top: 0.9rem;
    font-weight: 700;
    color: rgba(color.scale(colors.$accent, $lightness: 0%), 0.5);
    opacity: 0.8;
    white-space: pre-wrap;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  &:first-child {
    border-top: none;
  }

  @include queries.tablet {
    display: table-cell;
    position: static;
    padding: 0.85rem 0.9rem;
    min-height: initial;
    border-top: none;
    box-sizing: border-box;
    font-size: 1.05em;

    &::before {
      display: none;
      content: none;
    }
  }
}
</style>

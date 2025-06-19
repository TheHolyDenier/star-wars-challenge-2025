import type { Component } from 'vue';

export interface Column<T> {
  label: string;
  name: string;
  valueTransform?: (value: T) => string;
  createCell?: (value: T) => Component;
}

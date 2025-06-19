export interface Column<T> {
  label: string;
  name: string;
  valueTransform?: (value: T) => string | undefined;
}

import { get, orderBy } from 'lodash';
import type { Order } from '@/types/Order';

export const useTable = <T>(displayPerPage = 10) => {
  const paginate = (data: T[], page: number): T[] => {
    const start = (page - 1) * displayPerPage;
    const end = start + displayPerPage;
    return data.slice(start, end);
  };

  const getTotalPages = (data: T[]) => Math.max(1, Math.ceil(data.length / displayPerPage));

  const filter = (data: T[], search: string, searchBy: string[]): T[] => {
    if (!search) return data;

    const loweredSearch = search.toLowerCase();
    return data.filter((item) =>
      searchBy.some((key) =>
        String(get(item, key, ''))
          .toLowerCase()
          .includes(loweredSearch),
      ),
    );
  };

  const sortData = (data: T[], key: string, order: Order): T[] => orderBy(data, [key], [order]);

  return { paginate, getTotalPages, filter, sortData };
};

import type { Person } from '@/features/Person.ts';

export const useBaseService = (path: string) => {
  const URL = ` https://swapi.info/api/${path}`;

  const findAll = async (): Promise<Person[]> => {
    const result = await fetch(URL);
    return result.json();
  };

  const findById = async () => {};

  return { findAll, findById };
};

import { BaseEntity } from '@/features/BaseEntity';
import { plainToInstance } from 'class-transformer';

export const useBaseService = <T extends BaseEntity>(path: string, instance: new () => T) => {
  const URL = ` https://swapi.info/api/${path}`;

  const findAll = async (): Promise<T[]> => {
    const result = await fetch(URL);
    const data = result.json();
    return plainToInstance(instance, data, { excludeExtraneousValues: true });
  };

  const findById = async (id: number): Promise<T> => {
    const result = await fetch(`${URL}/${id}`);
    const data = result.json();
    return plainToInstance(instance, data, { excludeExtraneousValues: true });
  };

  return { findAll, findById };
};

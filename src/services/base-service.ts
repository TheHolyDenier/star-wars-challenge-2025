import { BaseEntity } from '@/features/BaseEntity';
import { plainToInstance } from 'class-transformer';
import { httpClient } from '@/services/http-client';

export const useBaseService = <T extends BaseEntity>(path: string, instance: new () => T) => {
  const URL = ` https://swapi.info/api/${path}`;

  const findAll = async (): Promise<T[]> => {
    const data = await httpClient<T[]>(URL);
    return plainToInstance(instance, data, { excludeExtraneousValues: true });
  };

  return { findAll };
};

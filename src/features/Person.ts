import { BaseEntity } from '@/features/BaseEntity.ts';
import { Expose, Type } from 'class-transformer';

export class Person extends BaseEntity {
  @Expose()
  @Type(() => Number)
  height: number;

  @Expose()
  @Type(() => Number)
  mass: number;

  @Expose({ name: 'hair_color' })
  hair: string;

  @Expose({ name: 'skin_color' })
  skin: string;

  @Expose({ name: 'eye_color' })
  eye: string;

  @Expose({ name: 'birth_year' })
  birthYear: string;

  @Expose()
  gender: string;

  @Expose()
  homeworld: string;
}

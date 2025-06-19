import { BaseEntity } from '@/features/BaseEntity.ts';
import { Expose, Transform } from 'class-transformer';

export class Person extends BaseEntity {
  @Expose()
  name: string;

  @Transform(({ value }) => (value ? Number(value) / 100.0 : null))
  @Expose()
  height: number;

  @Transform(({ value }) => (value ? Number(value) : null))
  @Expose()
  mass: number;

  @Expose({ name: 'hair_color' })
  hair: string;

  @Expose({ name: 'skin_color' })
  skin: string;

  @Expose({ name: 'eye_color' })
  eye: string;

  @Expose({ name: 'birth_year' })
  birthYear: number;

  @Expose()
  gender: string;

  @Expose()
  homeworld: string;

  @Expose()
  films: string[];

  @Expose()
  species: string[];

  @Expose()
  vehicles: string[];

  @Expose()
  starships: string[];
}

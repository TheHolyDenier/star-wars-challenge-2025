import { BaseEntity } from '@/features/BaseEntity';
import { Expose, Type } from 'class-transformer';

export class Planet extends BaseEntity {
  @Expose({ name: 'rotation_period' })
  @Type(() => Number)
  rotationPeriod: number;

  @Expose({ name: 'orbital_period' })
  @Type(() => Number)
  orbitalPeriod: number;

  @Expose()
  @Type(() => Number)
  diameter: number;

  @Expose()
  climate: string;

  @Expose()
  gravity: string;

  @Expose()
  terrain: string;

  @Expose({ name: 'surface_water' })
  @Type(() => Number)
  surfaceWater: number;

  @Expose()
  @Type(() => Number)
  population: number;
}

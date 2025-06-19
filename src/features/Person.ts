import { BaseEntity } from '@/features/BaseEntity.ts';

export class Person extends BaseEntity {
  name: string;

  height: number;

  mass: string;

  //hair_color
  hair: string;

  //'skin_color'
  skin: string;

  //'eye_color'
  eye: string;

  //'birth_year'
  birthYear: number;

  gender: string;
  homeworld: string;

  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

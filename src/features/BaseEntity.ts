import { Expose, Transform } from 'class-transformer';

export class BaseEntity {
  @Expose()
  @Transform(({ obj }) => {
    const url = obj.url;
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : null;
  })
  id: number;

  @Expose()
  created: string;

  @Expose()
  edited: string;

  @Expose()
  url: string;
}

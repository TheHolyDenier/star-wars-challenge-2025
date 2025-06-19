import { Expose, Transform, Type } from 'class-transformer';

export class BaseEntity {
  @Expose()
  name?: string;

  @Expose()
  @Transform(({ obj }) => {
    const url = obj.url;
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : null;
  })
  id: number;

  @Expose()
  @Type(() => Date)
  created: Date;

  @Expose()
  @Type(() => Date)
  edited: Date;

  @Expose()
  url: string;
}

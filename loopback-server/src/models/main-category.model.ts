import { Entity, model, property, hasMany } from '@loopback/repository';
import { Category } from './category.model';

@model({ settings: { strict: true } })
export class MainCategory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  main_id?: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true
    }

  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
  })
  date?: string;

  @hasMany(() => Category, { keyTo: 'main_id' })
  categories: Category[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MainCategory>) {
    super(data);
  }
}

export interface MainCategoryRelations {
  // describe navigational properties here
}

export type MainCategoryWithRelations = MainCategory & MainCategoryRelations;

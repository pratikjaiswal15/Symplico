import { Entity, model, property, hasMany } from '@loopback/repository';
import { Product } from './product.model';

@model({ settings: { strict: true } })
export class Category extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  category_id?: number;

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

  @property({
    type: 'number',
  })
  main_id?: number;

  @hasMany(() => Product, { keyTo: 'category_id' })
  products: Product[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;

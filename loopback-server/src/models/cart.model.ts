import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Users } from './users.model';
import { Product } from './product.model';

@model({ settings: { strict: true } })
export class Cart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  cart_id?: number;

  @property({
    type: 'date',

  })
  date?: string;


  @property({
    type: 'number',
    required: true,

  })
  quantity?: number;

  @property({
    type: 'number',
    required: true,

  })
  price?: number;


  @property({
    type: 'string',
    default: false,

  })
  disabled?: string;


  @belongsTo(() => Users, { name: 'users' })
  user_id: number;

  @belongsTo(() => Product, { name: 'product' })
  product_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;

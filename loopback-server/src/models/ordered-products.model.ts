import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Product } from './product.model';
import { Orders } from './orders.model';

@model({ settings: { strict: true } })
export class OrderedProducts extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  op_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => Product, { name: 'product' })
  product_id: number;

  @belongsTo(() => Orders, { name: 'orders' })
  order_id: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OrderedProducts>) {
    super(data);
  }
}

export interface OrderedProductsRelations {
  // describe navigational properties here
}

export type OrderedProductsWithRelations = OrderedProducts & OrderedProductsRelations;

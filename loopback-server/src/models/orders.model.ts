import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { Users } from './users.model';
import { Address } from './address.model';
import { OrderedProducts } from './ordered-products.model';

@model({ settings: { strict: true } })
export class Orders extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  order_id: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  razorpay_orderid?: string;

  @property({
    type: 'string',
  })
  razorpay_paymentid?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  payment_type: string;

  @belongsTo(() => Users, { name: 'users' })
  user_id: number;

  @belongsTo(() => Address, { name: 'address' })
  address_id: number;

  @hasMany(() => OrderedProducts, { keyTo: 'order_id' })
  orderedProducts: OrderedProducts[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {
  // describe navigational properties here
}

export type OrdersWithRelations = Orders & OrdersRelations;

import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Purchase } from './purchase.model';
import { Product } from './product.model';

@model({ settings: { strict: true } })
export class PurchaseProduct extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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

  @belongsTo(() => Purchase, { name: 'purchases' })
  purchase_id: string;

  @belongsTo(() => Product, { name: 'products' })
  product_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PurchaseProduct>) {
    super(data);
  }
}

export interface PurchaseProductRelations {
  // describe navigational properties here
}

export type PurchaseProductWithRelations = PurchaseProduct & PurchaseProductRelations;

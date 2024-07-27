import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Product } from './product.model';

@model({ settings: { strict: true } })
export class PurchaseStock extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,

  })
  purchase_stock_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  purchase_quantity: number;

  @property({
    type: 'date',
  })
  purchase_date?: string;

  @belongsTo(() => Product, { name: 'product' })
  product_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PurchaseStock>) {
    super(data);
  }
}

export interface PurchaseStockRelations {
  // describe navigational properties here
}

export type PurchaseStockWithRelations = PurchaseStock & PurchaseStockRelations;

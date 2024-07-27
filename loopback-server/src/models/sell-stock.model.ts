import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Product } from './product.model';

@model({ settings: { strict: true } })
export class SellStock extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,

  })
  sell_stock_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  sold_quantity: number;

  @property({
    type: 'date',
  })
  sold_date?: string;

  @belongsTo(() => Product, { name: 'product' })
  product_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SellStock>) {
    super(data);
  }
}

export interface SellStockRelations {
  // describe navigational properties here
}

export type SellStockWithRelations = SellStock & SellStockRelations;

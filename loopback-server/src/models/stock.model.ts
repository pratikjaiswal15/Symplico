import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Product } from './product.model';

@model({ settings: { strict: true } })
export class Stock extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,

  })
  stock_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  totalQuantity: number;

  @property({
    type: 'number',
    required: true,
  })
  RemainingQuantity: number;

  @belongsTo(() => Product, { name: 'product' })
  product_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {
  // describe navigational properties here
}

export type StockWithRelations = Stock & StockRelations;

import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Product, ProductWithRelations } from './product.model'

@model({ settings: { strict: true } })
export class ProductPrice extends Entity {
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
  fair_price: number;

  @property({
    type: 'number',
  })
  fluctuated_price?: number;

  @property({
    type: 'number',
  })
  discount?: number;

  @belongsTo(() => Product, { name: 'product' })
  product_id: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductPrice>) {
    super(data);
  }
}

export interface ProductPriceRelations {
  // describe navigational properties here
  product?: ProductWithRelations
}

export type ProductPriceWithRelations = ProductPrice & ProductPriceRelations;

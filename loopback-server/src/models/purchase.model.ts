import { Entity, model, property, hasMany, belongsTo } from '@loopback/repository';
import { PurchaseProduct } from './purchase-product.model';
import { Vendor } from './vendor.model';

@model({ settings: { strict: true } })
export class Purchase extends Entity {


  @property({
    type: 'string',
    id: true,

  })
  purchase_id: string;


  @property({
    type: 'date',
  })
  date?: string;


  @property({
    type: 'number',
    required: true,

  })
  totalprice?: number;
  @hasMany(() => PurchaseProduct, { keyTo: 'purchase_id' })
  purchaseProducts: PurchaseProduct[];

  @belongsTo(() => Vendor, { name: 'vendors' })
  vendor_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Purchase>) {
    super(data);
  }
}

export interface PurchaseRelations {
  // describe navigational properties here
}

export type PurchaseWithRelations = Purchase & PurchaseRelations;

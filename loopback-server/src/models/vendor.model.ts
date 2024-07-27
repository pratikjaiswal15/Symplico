import { Entity, model, property, hasMany } from '@loopback/repository';
import { Purchase } from './purchase.model';

@model({ settings: { strict: true } })
export class Vendor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  vendor_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true
    }
  })
  mobile_no: string;

  @property({
    type: 'string',
    index: {
      unique: true
    }
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  address_line1: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'number',
    required: true,
  })
  pincode: number;

  @property({
    type: 'string',
  })
  gst_number?: string;

  @hasMany(() => Purchase, { keyTo: 'vendor_id' })
  purchases: Purchase[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vendor>) {
    super(data);
  }
}

export interface VendorRelations {
  // describe navigational properties here
}

export type VendorWithRelations = Vendor & VendorRelations;

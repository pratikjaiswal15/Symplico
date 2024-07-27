import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { Users } from './users.model';
import { Orders } from './orders.model';

@model({ settings: { strict: true } })
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  address_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  pincode: string;

  @property({
    type: 'string',
    required: true,
  })
  address_line1: string;

  @property({
    type: 'string',
    required: true,
  })
  address_line2: string;

  @property({
    type: 'string',
  })
  landmark?: string;

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
    type: 'string',
  })
  alternate_mobile_no?: string;


  @property({
    type: 'string',
  })
  default?: string;

  @belongsTo(() => Users, { name: 'users' })
  user_id: number;

  @hasMany(() => Orders, { keyTo: 'address_id' })
  orders: Orders[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;

import { Entity, model, property, hasMany } from '@loopback/repository';
import { Address } from './address.model';
import { Cart } from './cart.model';
import { Orders } from './orders.model';

@model({ settings: { strict: true } })
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,

  })
  id: number;

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
    required: true,
    index: {
      unique: true
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true
    }
  })
  uid: string;


  @property({
    type: 'string',
  })
  role: string;


  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  business_name: string;


  @property({
    type: 'string',
  })
  gst_number?: string;


  @property({
    type: 'string',

  })
  fsaai_license?: string;


  @property({
    type: 'string',

  })
  image_url?: string;


  @hasMany(() => Address, { keyTo: 'user_id' })
  addresses: Address[];

  @hasMany(() => Cart, { keyTo: 'user_id' })
  carts: Cart[];

  @hasMany(() => Orders, { keyTo: 'user_id' })
  orders: Orders[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;

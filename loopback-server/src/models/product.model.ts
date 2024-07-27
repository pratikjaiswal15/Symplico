import { Entity, model, property, hasMany, hasOne, belongsTo } from '@loopback/repository';
import { Purchase } from './purchase.model';
import { Stock } from './stock.model';
import { PurchaseStock } from './purchase-stock.model';
import { SellStock } from './sell-stock.model';
import { OrderedProducts } from './ordered-products.model';
import { ProductPrice } from './product-price.model'
import { Category } from './category.model';
import {PurchaseProduct} from './purchase-product.model';

@model({ settings: { strict: true } })
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,

  })
  product_id?: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true
    }

  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  image_url: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  gst: number;

  @property({
    type: 'string',
    required: true,

  })
  unit: string;

  @property({
    type: 'date',
  })
  date?: string;



  @property({
    type: 'string',
    default: false,

  })
  disabled?: string;


  @hasMany(() => Stock, { keyTo: 'product_id' })
  stocks: Stock[];

  @hasMany(() => PurchaseStock, { keyTo: 'product_id' })
  purchaseStocks: PurchaseStock[];

  @hasMany(() => SellStock, { keyTo: 'product_id' })
  sellStocks: SellStock[];

  @hasMany(() => OrderedProducts, { keyTo: 'product_id' })
  orderedProducts: OrderedProducts[];

  @hasOne(() => ProductPrice, { keyTo: 'product_id' })
  productPrices: ProductPrice;

  @belongsTo(() => Category, { name: 'category' })
  category_id: number;

  @hasMany(() => PurchaseProduct, {keyTo: 'product_id'})
  purchaseProducts: PurchaseProduct[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;

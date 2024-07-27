import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PurchaseStock,
  Product,
} from '../models';
import { PurchaseStockRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class PurchaseStockProductController {
  constructor(
    @repository(PurchaseStockRepository)
    public purchaseStockRepository: PurchaseStockRepository,
  ) { }

  @get('/purchase-stocks/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to PurchaseStock',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof PurchaseStock.prototype.purchase_stock_id,
  ): Promise<Product> {
    return this.purchaseStockRepository.product(id);
  }


  @get('/purchase-stocks/product', {
    responses: {
      '200': {
        description: 'Product belonging to PurchaseStock',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getPurchase(
    @param.path.number('id') id: typeof PurchaseStock.prototype.purchase_stock_id,
  ): Promise<Product> {
    return this.purchaseStockRepository.product(id);
  }


}

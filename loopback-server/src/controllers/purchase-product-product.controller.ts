import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PurchaseProduct,
  Product,
} from '../models';
import { PurchaseProductRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class PurchaseProductProductController {
  constructor(
    @repository(PurchaseProductRepository)
    public purchaseProductRepository: PurchaseProductRepository,
  ) { }

  @get('/purchase-products/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to PurchaseProduct',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof PurchaseProduct.prototype.id,
  ): Promise<Product> {
    return this.purchaseProductRepository.product(id);
  }
}

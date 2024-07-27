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
  Purchase,
} from '../models';
import { PurchaseProductRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class PurchaseProductPurchaseController {
  constructor(
    @repository(PurchaseProductRepository)
    public purchaseProductRepository: PurchaseProductRepository,
  ) { }

  @get('/purchase-products/{id}/purchase', {
    responses: {
      '200': {
        description: 'Purchase belonging to PurchaseProduct',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Purchase) },
          },
        },
      },
    },
  })
  async getPurchase(
    @param.path.number('id') id: typeof PurchaseProduct.prototype.id,
  ): Promise<Purchase> {
    return this.purchaseProductRepository.purchase(id);
  }
}

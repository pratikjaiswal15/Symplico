import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Purchase,
  PurchaseProduct,
} from '../models';
import { PurchaseRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class PurchasePurchaseProductController {
  constructor(
    @repository(PurchaseRepository) protected purchaseRepository: PurchaseRepository,
  ) { }

  @get('/purchases/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Array of PurchaseProduct\'s belonging to Purchase',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PurchaseProduct) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PurchaseProduct>,
  ): Promise<PurchaseProduct[]> {
    return this.purchaseRepository.purchaseProducts(id).find(filter);
  }

  @post('/purchases/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Purchase model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PurchaseProduct) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Purchase.prototype.purchase_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseProduct, {
            title: 'NewPurchaseProductInPurchase',
            exclude: ['id'],
            optional: ['purchase_id']
          }),
        },
      },
    }) purchaseProduct: Omit<PurchaseProduct, 'id'>,
  ): Promise<PurchaseProduct> {
    return this.purchaseRepository.purchaseProducts(id).create(purchaseProduct);
  }

  @patch('/purchases/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Purchase.PurchaseProduct PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseProduct, { partial: true }),
        },
      },
    })
    purchaseProduct: Partial<PurchaseProduct>,
    @param.query.object('where', getWhereSchemaFor(PurchaseProduct)) where?: Where<PurchaseProduct>,
  ): Promise<Count> {
    return this.purchaseRepository.purchaseProducts(id).patch(purchaseProduct, where);
  }

  @del('/purchases/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Purchase.PurchaseProduct DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PurchaseProduct)) where?: Where<PurchaseProduct>,
  ): Promise<Count> {
    return this.purchaseRepository.purchaseProducts(id).delete(where);
  }
}

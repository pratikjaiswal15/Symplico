import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { PurchaseProduct } from '../models';
import { PurchaseProductRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class PurchaseProductController {
  constructor(
    @repository(PurchaseProductRepository)
    public purchaseProductRepository: PurchaseProductRepository,
  ) { }

  @post('/purchase-products', {
    responses: {
      '200': {
        description: 'PurchaseProduct model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PurchaseProduct) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseProduct, {
            title: 'NewPurchaseProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    purchaseProduct: Omit<PurchaseProduct, 'id'>,
  ): Promise<PurchaseProduct> {
    return this.purchaseProductRepository.create(purchaseProduct);
  }

  @get('/purchase-products/count', {
    responses: {
      '200': {
        description: 'PurchaseProduct model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PurchaseProduct)) where?: Where<PurchaseProduct>,
  ): Promise<Count> {
    return this.purchaseProductRepository.count(where);
  }

  @get('/purchase-products', {
    responses: {
      '200': {
        description: 'Array of PurchaseProduct model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PurchaseProduct, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PurchaseProduct)) filter?: Filter<PurchaseProduct>,
  ): Promise<PurchaseProduct[]> {
    return this.purchaseProductRepository.find(filter);
  }

  @patch('/purchase-products', {
    responses: {
      '200': {
        description: 'PurchaseProduct PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseProduct, { partial: true }),
        },
      },
    })
    purchaseProduct: PurchaseProduct,
    @param.query.object('where', getWhereSchemaFor(PurchaseProduct)) where?: Where<PurchaseProduct>,
  ): Promise<Count> {
    return this.purchaseProductRepository.updateAll(purchaseProduct, where);
  }

  @get('/purchase-products/{id}', {
    responses: {
      '200': {
        description: 'PurchaseProduct model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PurchaseProduct, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(PurchaseProduct)) filter?: Filter<PurchaseProduct>
  ): Promise<PurchaseProduct> {
    return this.purchaseProductRepository.findById(id, filter);
  }

  @patch('/purchase-products/{id}', {
    responses: {
      '204': {
        description: 'PurchaseProduct PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseProduct, { partial: true }),
        },
      },
    })
    purchaseProduct: PurchaseProduct,
  ): Promise<void> {
    await this.purchaseProductRepository.updateById(id, purchaseProduct);
  }

  @put('/purchase-products/{id}', {
    responses: {
      '204': {
        description: 'PurchaseProduct PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() purchaseProduct: PurchaseProduct,
  ): Promise<void> {
    await this.purchaseProductRepository.replaceById(id, purchaseProduct);
  }

  @del('/purchase-products/{id}', {
    responses: {
      '204': {
        description: 'PurchaseProduct DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.purchaseProductRepository.deleteById(id);
  }
}

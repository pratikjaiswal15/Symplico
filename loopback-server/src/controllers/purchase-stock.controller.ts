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
import { PurchaseStock } from '../models';
import { PurchaseStockRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')

export class PurchaseStockController {
  constructor(
    @repository(PurchaseStockRepository)
    public purchaseStockRepository: PurchaseStockRepository,
  ) { }

  @post('/purchase-stocks', {
    responses: {
      '200': {
        description: 'PurchaseStock model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PurchaseStock) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseStock, { exclude: ['purchase_stock_id'] }),
        },
      },
    })
    purchaseStock: Omit<PurchaseStock, 'purchase_stock_id'>,
  ): Promise<PurchaseStock> {
    return this.purchaseStockRepository.create(purchaseStock);
  }

  @get('/purchase-stocks/count', {
    responses: {
      '200': {
        description: 'PurchaseStock model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PurchaseStock)) where?: Where<PurchaseStock>,
  ): Promise<Count> {
    return this.purchaseStockRepository.count(where);
  }

  @get('/purchase-stocks', {
    responses: {
      '200': {
        description: 'Array of PurchaseStock model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PurchaseStock) },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PurchaseStock)) filter?: Filter<PurchaseStock>,
  ): Promise<PurchaseStock[]> {
    return this.purchaseStockRepository.find(filter);
  }

  @patch('/purchase-stocks', {
    responses: {
      '200': {
        description: 'PurchaseStock PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseStock, { partial: true }),
        },
      },
    })
    purchaseStock: PurchaseStock,
    @param.query.object('where', getWhereSchemaFor(PurchaseStock)) where?: Where<PurchaseStock>,
  ): Promise<Count> {
    return this.purchaseStockRepository.updateAll(purchaseStock, where);
  }

  @get('/purchase-stocks/{id}', {
    responses: {
      '200': {
        description: 'PurchaseStock model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PurchaseStock) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(PurchaseStock))
    filter?: Filter<PurchaseStock>,
  ): Promise<PurchaseStock> {
    return this.purchaseStockRepository.findById(id, filter);
  }

  @patch('/purchase-stocks/{id}', {
    responses: {
      '204': {
        description: 'PurchaseStock PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseStock, { partial: true }),
        },
      },
    })
    purchaseStock: PurchaseStock,
  ): Promise<void> {
    await this.purchaseStockRepository.updateById(id, purchaseStock);
  }

  @put('/purchase-stocks/{id}', {
    responses: {
      '204': {
        description: 'PurchaseStock PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() purchaseStock: PurchaseStock,
  ): Promise<void> {
    await this.purchaseStockRepository.replaceById(id, purchaseStock);
  }

  @del('/purchase-stocks/{id}', {
    responses: {
      '204': {
        description: 'PurchaseStock DELETE success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.purchaseStockRepository.deleteById(id);
  }

  @get('/purchase-stocks/product', {
    responses: {
      '200': {
        description: 'Array of PurchaseStock model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PurchaseStock) },
          },
        },
      },
    },
  })
  async findproduct(
    @param.query.object('filter', getFilterSchemaFor(PurchaseStock)) filter?: Filter<PurchaseStock>,
  ): Promise<PurchaseStock[]> {

    return this.purchaseStockRepository.find({
      include: [{
        relation: 'product',
        scope: {
          fields: { date: false, unit: false, image_url: false, description: false, gst: false, disabled: false, category_id: false }
        }
      }]
    });
  }


}

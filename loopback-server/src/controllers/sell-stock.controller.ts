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
import { SellStock } from '../models';
import { SellStockRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
export class SellStockController {
  constructor(
    @repository(SellStockRepository)
    public sellStockRepository: SellStockRepository,
  ) { }

  @post('/sell-stocks', {
    responses: {
      '200': {
        description: 'SellStock model instance',
        content: { 'application/json': { schema: getModelSchemaRef(SellStock) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellStock, { exclude: ['sell_stock_id'] }),
        },
      },
    })
    sellStock: Omit<SellStock, 'sell_stock_id'>,
  ): Promise<SellStock> {
    return this.sellStockRepository.create(sellStock);
  }

  @get('/sell-stocks/count', {
    responses: {
      '200': {
        description: 'SellStock model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async count(
    @param.query.object('where', getWhereSchemaFor(SellStock)) where?: Where<SellStock>,
  ): Promise<Count> {
    return this.sellStockRepository.count(where);
  }

  @get('/sell-stocks', {
    responses: {
      '200': {
        description: 'Array of SellStock model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(SellStock) },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find(
    @param.query.object('filter', getFilterSchemaFor(SellStock)) filter?: Filter<SellStock>,
  ): Promise<SellStock[]> {
    return this.sellStockRepository.find(filter);
  }

  @patch('/sell-stocks', {
    responses: {
      '200': {
        description: 'SellStock PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellStock, { partial: true }),
        },
      },
    })
    sellStock: SellStock,
    @param.query.object('where', getWhereSchemaFor(SellStock)) where?: Where<SellStock>,
  ): Promise<Count> {
    return this.sellStockRepository.updateAll(sellStock, where);
  }

  @get('/sell-stocks/{id}', {
    responses: {
      '200': {
        description: 'SellStock model instance',
        content: { 'application/json': { schema: getModelSchemaRef(SellStock) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(SellStock))
    filter?: Filter<SellStock>,
  ): Promise<SellStock> {
    return this.sellStockRepository.findById(id, filter);
  }

  @patch('/sell-stocks/{id}', {
    responses: {
      '204': {
        description: 'SellStock PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellStock, { partial: true }),
        },
      },
    })
    sellStock: SellStock,
  ): Promise<void> {
    await this.sellStockRepository.updateById(id, sellStock);
  }

  @put('/sell-stocks/{id}', {
    responses: {
      '204': {
        description: 'SellStock PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sellStock: SellStock,
  ): Promise<void> {
    await this.sellStockRepository.replaceById(id, sellStock);
  }

  @del('/sell-stocks/{id}', {
    responses: {
      '204': {
        description: 'SellStock DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sellStockRepository.deleteById(id);
  }
}

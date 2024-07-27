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
import { Stock } from '../models';
import { StockRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class StockController {
  constructor(
    @repository(StockRepository)
    public stockRepository: StockRepository,
  ) { }

  @post('/stocks', {
    responses: {
      '200': {
        description: 'Stock model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Stock) } },
      },
    },
  })

  @authorize.skip()
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, { exclude: ['stock_id'] }),
        },
      },
    })
    stock: Omit<Stock, 'stock_id'>,
  ): Promise<Stock> {
    return this.stockRepository.create(stock);
  }

  @get('/stocks/count', {
    responses: {
      '200': {
        description: 'Stock model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.stockRepository.count(where);
  }

  @get('/stocks', {
    responses: {
      '200': {
        description: 'Array of Stock model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Stock) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Stock)) filter?: Filter<Stock>,
  ): Promise<Stock[]> {
    return this.stockRepository.find(filter);
  }

  @patch('/stocks', {
    responses: {
      '200': {
        description: 'Stock PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, { partial: true }),
        },
      },
    })
    stock: Stock,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.stockRepository.updateAll(stock, where);
  }

  @get('/stocks/{id}', {
    responses: {
      '200': {
        description: 'Stock model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Stock) } },
      },
    },
  })

  @authorize.skip()
  async findById(@param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Stock))
    filter?: Filter<Stock>,
  ): Promise<Stock> {
    return this.stockRepository.findById(id, filter);
  }

  @patch('/stocks/{id}', {
    responses: {
      '204': {
        description: 'Stock PATCH success',
      },
    },
  })

  @authorize.skip()
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, { partial: true }),
        },
      },
    })
    stock: Stock,
  ): Promise<void> {
    await this.stockRepository.updateById(id, stock);
  }

  @put('/stocks/{id}', {
    responses: {
      '204': {
        description: 'Stock PUT success',
      },
    },
  })

  @authorize.skip()
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() stock: Stock,
  ): Promise<void> {
    await this.stockRepository.replaceById(id, stock);
  }

  @del('/stocks/{id}', {
    responses: {
      '204': {
        description: 'Stock DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.stockRepository.deleteById(id);
  }


  @get('/stocks/product', {
    responses: {
      '200': {
        description: 'Array of Stock model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Stock) },
          },
        },
      },
    },
  })


  async findproduct(
  ): Promise<Stock[]> {
    return this.stockRepository.find({
      include: [{
        relation: 'product',
        scope: {
          fields: { date: false, unit: false, image_url: false, description: false, gst: false, disabled: false, category_id: false }

        }
      }]
    });
  }

}

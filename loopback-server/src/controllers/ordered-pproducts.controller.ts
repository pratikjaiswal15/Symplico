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
import { OrderedProducts } from '../models';
import { OrderedProductsRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
export class OrderedPproductsController {
  constructor(
    @repository(OrderedProductsRepository)
    public orderedProductsRepository: OrderedProductsRepository,
  ) { }

  @post('/ordered-products', {
    responses: {
      '200': {
        description: 'OrderedProducts model instance',
        content: { 'application/json': { schema: getModelSchemaRef(OrderedProducts) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProducts, {
            title: 'NewOrderedProducts',
            exclude: ['op_id'],
          }),
        },
      },
    })
    orderedProducts: Omit<OrderedProducts, 'op_id'>,
  ): Promise<OrderedProducts> {
    return this.orderedProductsRepository.create(orderedProducts);
  }

  @get('/ordered-products/count', {
    responses: {
      '200': {
        description: 'OrderedProducts model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async count(
    @param.query.object('where', getWhereSchemaFor(OrderedProducts)) where?: Where<OrderedProducts>,
  ): Promise<Count> {
    return this.orderedProductsRepository.count(where);
  }

  @get('/ordered-products', {
    responses: {
      '200': {
        description: 'Array of OrderedProducts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrderedProducts, { includeRelations: true }),
            },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find(
    @param.query.object('filter', getFilterSchemaFor(OrderedProducts)) filter?: Filter<OrderedProducts>,
  ): Promise<OrderedProducts[]> {
    return this.orderedProductsRepository.find(filter);
  }

  @patch('/ordered-products', {
    responses: {
      '200': {
        description: 'OrderedProducts PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProducts, { partial: true }),
        },
      },
    })
    orderedProducts: OrderedProducts,
    @param.query.object('where', getWhereSchemaFor(OrderedProducts)) where?: Where<OrderedProducts>,
  ): Promise<Count> {
    return this.orderedProductsRepository.updateAll(orderedProducts, where);
  }

  @get('/ordered-products/{id}', {
    responses: {
      '200': {
        description: 'OrderedProducts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrderedProducts, { includeRelations: true }),
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(OrderedProducts)) filter?: Filter<OrderedProducts>
  ): Promise<OrderedProducts> {
    return this.orderedProductsRepository.findById(id, filter);
  }

  @patch('/ordered-products/{id}', {
    responses: {
      '204': {
        description: 'OrderedProducts PATCH success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProducts, { partial: true }),
        },
      },
    })
    orderedProducts: OrderedProducts,
  ): Promise<void> {
    await this.orderedProductsRepository.updateById(id, orderedProducts);
  }

  @put('/ordered-products/{id}', {
    responses: {
      '204': {
        description: 'OrderedProducts PUT success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orderedProducts: OrderedProducts,
  ): Promise<void> {
    await this.orderedProductsRepository.replaceById(id, orderedProducts);
  }

  @del('/ordered-products/{id}', {
    responses: {
      '204': {
        description: 'OrderedProducts DELETE success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderedProductsRepository.deleteById(id);
  }
}

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
  Orders,
  OrderedProducts,
} from '../models';
import { OrdersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class OrdersOrderedProductsController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Array of OrderedProducts\'s belonging to Orders',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(OrderedProducts) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrderedProducts>,
  ): Promise<OrderedProducts[]> {
    return this.ordersRepository.orderedProducts(id).find(filter);
  }

  @post('/orders/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: { 'application/json': { schema: getModelSchemaRef(OrderedProducts) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Orders.prototype.order_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProducts, {
            title: 'NewOrderedProductsInOrders',
            exclude: ['op_id'],
            optional: ['order_id']
          }),
        },
      },
    }) orderedProducts: Omit<OrderedProducts, 'op_id'>,
  ): Promise<OrderedProducts> {
    return this.ordersRepository.orderedProducts(id).create(orderedProducts);
  }

  @patch('/orders/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Orders.OrderedProducts PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProducts, { partial: true }),
        },
      },
    })
    orderedProducts: Partial<OrderedProducts>,
    @param.query.object('where', getWhereSchemaFor(OrderedProducts)) where?: Where<OrderedProducts>,
  ): Promise<Count> {
    return this.ordersRepository.orderedProducts(id).patch(orderedProducts, where);
  }

  @del('/orders/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Orders.OrderedProducts DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderedProducts)) where?: Where<OrderedProducts>,
  ): Promise<Count> {
    return this.ordersRepository.orderedProducts(id).delete(where);
  }
}

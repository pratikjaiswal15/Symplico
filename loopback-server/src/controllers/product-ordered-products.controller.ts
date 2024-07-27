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
  Product,
  OrderedProducts,
} from '../models';
import { ProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class ProductOrderedProductsController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Array of OrderedProducts\'s belonging to Product',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(OrderedProducts) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrderedProducts>,
  ): Promise<OrderedProducts[]> {
    return this.productRepository.orderedProducts(id).find(filter);
  }

  @post('/products/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(OrderedProducts) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProducts, {
            title: 'NewOrderedProductsInProduct',
            exclude: ['op_id'],
            optional: ['product_id']
          }),
        },
      },
    }) orderedProducts: Omit<OrderedProducts, 'op_id'>,
  ): Promise<OrderedProducts> {
    return this.productRepository.orderedProducts(id).create(orderedProducts);
  }

  @patch('/products/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Product.OrderedProducts PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.productRepository.orderedProducts(id).patch(orderedProducts, where);
  }

  @del('/products/{id}/ordered-products', {
    responses: {
      '200': {
        description: 'Product.OrderedProducts DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderedProducts)) where?: Where<OrderedProducts>,
  ): Promise<Count> {
    return this.productRepository.orderedProducts(id).delete(where);
  }
}

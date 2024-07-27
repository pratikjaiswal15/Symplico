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
  Stock,
} from '../models';
import { ProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
export class ProductStockController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/stocks', {
    responses: {
      '200': {
        description: 'Array of Stock\'s belonging to Product',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Stock) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stock>,
  ): Promise<Stock[]> {
    return this.productRepository.stocks(id).find(filter);
  }

  @post('/products/{id}/stocks', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Stock) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            exclude: ['stock_id'],
            optional: ['product_id']
          }),
        },
      },
    }) stock: Omit<Stock, 'stock_id'>,
  ): Promise<Stock> {
    return this.productRepository.stocks(id).create(stock);
  }

  @patch('/products/{id}/stocks', {
    responses: {
      '200': {
        description: 'Product.Stock PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, { partial: true }),
        },
      },
    })
    stock: Partial<Stock>,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.productRepository.stocks(id).patch(stock, where);
  }

  @del('/products/{id}/stocks', {
    responses: {
      '200': {
        description: 'Product.Stock DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.productRepository.stocks(id).delete(where);
  }


  @patch('/products/{id}/stocks/parch_quantity', {
    responses: {
      '200': {
        description: 'Product.Stock PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch_id(
    @param.path.number('id') id: number,

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, { partial: true }),
        },
      },
    })
    stock: Partial<Stock>,
    // @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.productRepository.stocks(id).patch(stock);
  }


  @get('/products/{id}/stocks/remaining', {
    responses: {
      '200': {
        description: 'Array of Stock\'s belonging to Product',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Stock) },
          },
        },
      },
    },
  })
  async find_id(
    @param.path.number('id') id: number,

    // @param.query.object('filter') filter?: Filter<Stock>,
  ): Promise<Stock[]> {
    return this.productRepository.stocks(id).find({ fields: { RemainingQuantity: true } });
  }


}

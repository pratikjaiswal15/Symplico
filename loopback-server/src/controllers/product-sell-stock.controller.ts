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
  SellStock,
} from '../models';
import { ProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
export class ProductSellStockController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/sell-stocks', {
    responses: {
      '200': {
        description: 'Array of SellStock\'s belonging to Product',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(SellStock) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SellStock>,
  ): Promise<SellStock[]> {
    return this.productRepository.sellStocks(id).find(filter);
  }

  @post('/products/{id}/sell-stocks', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(SellStock) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellStock, {
            exclude: ['sell_stock_id'],
            optional: ['product_id']
          }),
        },
      },
    }) sellStock: Omit<SellStock, 'sell_stock_id'>,
  ): Promise<SellStock> {
    return this.productRepository.sellStocks(id).create(sellStock);
  }

  @patch('/products/{id}/sell-stocks', {
    responses: {
      '200': {
        description: 'Product.SellStock PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellStock, { partial: true }),
        },
      },
    })
    sellStock: Partial<SellStock>,
    @param.query.object('where', getWhereSchemaFor(SellStock)) where?: Where<SellStock>,
  ): Promise<Count> {
    return this.productRepository.sellStocks(id).patch(sellStock, where);
  }

  @del('/products/{id}/sell-stocks', {
    responses: {
      '200': {
        description: 'Product.SellStock DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SellStock)) where?: Where<SellStock>,
  ): Promise<Count> {
    return this.productRepository.sellStocks(id).delete(where);
  }



}

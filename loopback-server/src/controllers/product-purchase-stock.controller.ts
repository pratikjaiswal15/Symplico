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
  PurchaseStock,
} from '../models';
import { ProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')

export class ProductPurchaseStockController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/purchase-stocks', {
    responses: {
      '200': {
        description: 'Array of PurchaseStock\'s belonging to Product',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PurchaseStock) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PurchaseStock>,
  ): Promise<PurchaseStock[]> {
    return this.productRepository.purchaseStocks(id).find(filter);
  }

  @post('/products/{id}/purchase-stocks', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PurchaseStock) } },
      },
    },
  })

  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseStock, {
            exclude: ['purchase_stock_id'],
            optional: ['product_id']
          }),
        },
      },
    }) purchaseStock: Omit<PurchaseStock, 'purchase_stock_id'>,
  ): Promise<PurchaseStock> {
    return this.productRepository.purchaseStocks(id).create(purchaseStock);
  }

  @patch('/products/{id}/purchase-stocks', {
    responses: {
      '200': {
        description: 'Product.PurchaseStock PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseStock, { partial: true }),
        },
      },
    })
    purchaseStock: Partial<PurchaseStock>,
    @param.query.object('where', getWhereSchemaFor(PurchaseStock)) where?: Where<PurchaseStock>,
  ): Promise<Count> {
    return this.productRepository.purchaseStocks(id).patch(purchaseStock, where);
  }

  @del('/products/{id}/purchase-stocks', {
    responses: {
      '200': {
        description: 'Product.PurchaseStock DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PurchaseStock)) where?: Where<PurchaseStock>,
  ): Promise<Count> {
    return this.productRepository.purchaseStocks(id).delete(where);
  }
}

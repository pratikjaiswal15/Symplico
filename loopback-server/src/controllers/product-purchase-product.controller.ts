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
  PurchaseProduct,
} from '../models';
import { ProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class ProductPurchaseProductController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Array of PurchaseProduct\'s belonging to Product',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PurchaseProduct) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PurchaseProduct>,
  ): Promise<PurchaseProduct[]> {
    return this.productRepository.purchaseProducts(id).find(filter);
  }

  @post('/products/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PurchaseProduct) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseProduct, {
            title: 'NewPurchaseProductInProduct',
            exclude: ['id'],
            optional: ['product_id']
          }),
        },
      },
    }) purchaseProduct: Omit<PurchaseProduct, 'id'>,
  ): Promise<PurchaseProduct> {
    return this.productRepository.purchaseProducts(id).create(purchaseProduct);
  }

  @patch('/products/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Product.PurchaseProduct PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseProduct, { partial: true }),
        },
      },
    })
    purchaseProduct: Partial<PurchaseProduct>,
    @param.query.object('where', getWhereSchemaFor(PurchaseProduct)) where?: Where<PurchaseProduct>,
  ): Promise<Count> {
    return this.productRepository.purchaseProducts(id).patch(purchaseProduct, where);
  }

  @del('/products/{id}/purchase-products', {
    responses: {
      '200': {
        description: 'Product.PurchaseProduct DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PurchaseProduct)) where?: Where<PurchaseProduct>,
  ): Promise<Count> {
    return this.productRepository.purchaseProducts(id).delete(where);
  }
}

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
  ProductPrice,
} from '../models';
import { ProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
export class ProductProductpriceController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,

  ) { }

  @get('/products/{id}/product-price', {
    responses: {
      '200': {
        description: 'Array of productPrice\'s belonging to Product',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ProductPrice) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,

    @param.query.object('filter') filter?: Filter<ProductPrice>,
    @param.query.object('where', getWhereSchemaFor(ProductPrice)) where?: Where<ProductPrice>,

  ): Promise<ProductPrice> {
    return this.productRepository.productPrices(id).get(filter)
  }

  @post('/products/{id}/product-price', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ProductPrice) } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPrice, {
            exclude: ['id'],
            optional: ['product_id']
          }),
        },
      },
    }) price: Omit<ProductPrice, 'id'>,
  ): Promise<ProductPrice> {
    return this.productRepository.productPrices(id).create(price);
  }

  @patch('/products/{id}/product-price', {
    responses: {
      '200': {
        description: 'Product.Product-price PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPrice, { partial: true }),
        },
      },
    })
    price: Partial<ProductPrice>,
    @param.query.object('where', getWhereSchemaFor(ProductPrice)) where?: Where<ProductPrice>,
  ): Promise<Count> {
    return this.productRepository.productPrices(id).patch(price, where);
  }


  @del('/products/{id}/product-price', {
    responses: {
      '200': {
        description: 'Product.Product-price DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductPrice)) where?: Where<ProductPrice>,
  ): Promise<Count> {
    return this.productRepository.productPrices(id).delete(where);
  }

}


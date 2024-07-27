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
import { ProductPrice } from '../models';
import { ProductPriceRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class ProductPriceController {
  constructor(
    @repository(ProductPriceRepository)
    public productPriceRepository: ProductPriceRepository,
  ) { }

  @post('/product-prices', {
    responses: {
      '200': {
        description: 'ProductPrice model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ProductPrice) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPrice, {
            title: 'NewProductPrice',
            exclude: ['id'],
          }),
        },
      },
    })
    productPrice: Omit<ProductPrice, 'id'>,
  ): Promise<ProductPrice> {
    return this.productPriceRepository.create(productPrice);
  }

  @get('/product-prices/count', {
    responses: {
      '200': {
        description: 'ProductPrice model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ProductPrice)) where?: Where<ProductPrice>,
  ): Promise<Count> {
    return this.productPriceRepository.count(where);
  }

  @get('/product-prices', {
    responses: {
      '200': {
        description: 'Array of ProductPrice model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProductPrice, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ProductPrice)) filter?: Filter<ProductPrice>,
  ): Promise<ProductPrice[]> {
    return this.productPriceRepository.find(filter);
  }

  @patch('/product-prices', {
    responses: {
      '200': {
        description: 'ProductPrice PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPrice, { partial: true }),
        },
      },
    })
    productPrice: ProductPrice,
    @param.query.object('where', getWhereSchemaFor(ProductPrice)) where?: Where<ProductPrice>,
  ): Promise<Count> {
    return this.productPriceRepository.updateAll(productPrice, where);
  }

  @get('/product-prices/{id}', {
    responses: {
      '200': {
        description: 'ProductPrice model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProductPrice, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(ProductPrice)) filter?: Filter<ProductPrice>
  ): Promise<ProductPrice> {
    return this.productPriceRepository.findById(id, filter);
  }

  @patch('/product-prices/{id}', {
    responses: {
      '204': {
        description: 'ProductPrice PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPrice, { partial: true }),
        },
      },
    })
    productPrice: ProductPrice,
  ): Promise<void> {
    await this.productPriceRepository.updateById(id, productPrice);
  }

  @put('/product-prices/{id}', {
    responses: {
      '204': {
        description: 'ProductPrice PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productPrice: ProductPrice,
  ): Promise<void> {
    await this.productPriceRepository.replaceById(id, productPrice);
  }

  @del('/product-prices/{id}', {
    responses: {
      '204': {
        description: 'ProductPrice DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productPriceRepository.deleteById(id);
  }
}

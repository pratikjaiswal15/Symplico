import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderedProducts,
  Product,
} from '../models';
import { OrderedProductsRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class OrderedProductsProductController {
  constructor(
    @repository(OrderedProductsRepository)
    public orderedProductsRepository: OrderedProductsRepository,
  ) { }

  @get('/ordered-products/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to OrderedProducts',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof OrderedProducts.prototype.op_id,
  ): Promise<Product> {
    return this.orderedProductsRepository.product(id);
  }
}

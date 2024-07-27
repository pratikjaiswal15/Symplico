import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cart,
  Product,
} from '../models';
import { CartRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class CartProductController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to Cart',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof Cart.prototype.cart_id,
  ): Promise<Product> {
    return this.cartRepository.product(id);
  }
}

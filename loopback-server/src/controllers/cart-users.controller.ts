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
  Users,
} from '../models';
import { CartRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class CartUsersController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Cart',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Users) },
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof Cart.prototype.cart_id,
  ): Promise<Users> {
    return this.cartRepository.users(id);
  }
}


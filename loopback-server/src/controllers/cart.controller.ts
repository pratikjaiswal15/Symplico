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
import { Cart } from '../models';
import { CartRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
export class CartController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @post('/carts', {
    responses: {
      '200': {
        description: 'Cart model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cart) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCart',
            exclude: ['cart_id'],
          }),
        },
      },
    })
    cart: Omit<Cart, 'cart_id'>,
  ): Promise<Cart> {
    return this.cartRepository.create(cart);
  }

  @get('/carts/count', {
    responses: {
      '200': {
        description: 'Cart model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async count(
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.cartRepository.count(where);
  }

  @get('/carts', {
    responses: {
      '200': {
        description: 'Array of Cart model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Cart) },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cart)) filter?: Filter<Cart>,
  ): Promise<Cart[]> {
    return this.cartRepository.find(filter);
  }

  @patch('/carts', {
    responses: {
      '200': {
        description: 'Cart PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, { partial: true }),
        },
      },
    })
    cart: Cart,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.cartRepository.updateAll(cart, where);
  }

  @get('/carts/{id}', {
    responses: {
      '200': {
        description: 'Cart model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cart) } },
      },
    },
  })

  async findById(@param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Cart))
    filter?: Filter<Cart>,
  )

    : Promise<Cart> {
    return this.cartRepository.findById(id, filter);
  }

  /*
    @get('/carts/users/{id}', {
      responses: {
        '200': {
          description: 'Cart model instance',
          content: { 'application/json': { schema: getModelSchemaRef(Cart) } },
        },
      },
    })

  */

  /*

  @patch('/carts/{id}', {
    responses: {
      '204': {
        description: 'Cart PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, { partial: true }),
        },
      },
    })
    cart: Cart,
  ): Promise<void> {
    await this.cartRepository.updateById(id, cart);
  }
*/


  @put('/carts/{id}', {
    responses: {
      '204': {
        description: 'Cart PUT success',
      },
    },
  })
  async replaceById(

    @param.path.number('id') id: number,
    @requestBody() cart: Cart,
  ): Promise<void> {
    await this.cartRepository.replaceById(id, cart);
  }




  @del('/carts/{id}', {
    responses: {
      '204': {
        description: 'Cart DELETE success',
      },
    },
  })


  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cartRepository.deleteById(id);
  }
}

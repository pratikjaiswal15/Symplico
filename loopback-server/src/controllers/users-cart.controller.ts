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
  Users,
  Cart,
} from '../models';
import { UsersRepository, CartRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class UsersCartController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @get('/users/{id}/carts', {
    responses: {
      '200': {
        description: 'Array of Cart\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Cart) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cart>,
  ): Promise<Cart[]> {
    return this.usersRepository.carts(id).find(filter);
  }

  @post('/users/{id}/carts', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cart) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCartInUsers',
            exclude: ['cart_id'],
            optional: ['user_id']
          }),
        },
      },
    }) cart: Omit<Cart, 'cart_id'>,
  ): Promise<Cart> {
    return this.usersRepository.carts(id).create(cart);
  }

  @patch('/users/{id}/carts', {
    responses: {
      '200': {
        description: 'Users.Cart PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, { partial: true }),
        },
      },
    })
    cart: Partial<Cart>,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.usersRepository.carts(id).patch(cart, where);
  }

  @del('/users/{id}/carts', {
    responses: {
      '200': {
        description: 'Users.Cart DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.usersRepository.carts(id).delete(where);
  }


  @patch('/users/{id}/carts/{cart_id}', {
    responses: {
      '200': {
        description: 'Users.Cart PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch_id(
    @param.path.number('id') id: number,
    @param.path.number('cart_id') cart_id: number,

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, { partial: true }),
        },
      },
    })
    cart: Partial<Cart>,
    //  @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.usersRepository.carts(id).patch(cart, { cart_id: cart_id });
  }


  @del('/users/{id}/carts/{cart_id}', {
    responses: {
      '200': {
        description: 'Users.Cart DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete_id(
    @param.path.number('id') id: number,
    @param.path.number('cart_id') cart_id: number,

    //  @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.usersRepository.carts(id).delete({ cart_id: cart_id });
  }

  @get('/users/{id}/carts/{cart_id}', {
    responses: {
      '200': {
        description: 'Array of Cart\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Cart) },
          },
        },
      },
    },
  })
  async find_id(
    @param.path.number('id') id: number,
    @param.path.number('cart_id') cart_id: number,


  ): Promise<Cart[]> {
    return this.usersRepository.carts(id).find({ where: { cart_id: cart_id } });
  }

  @get('/users/{id}/carts/count', {
    responses: {
      '200': {
        description: 'Users Cart model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.path.number('id') id: number,
  ): Promise<Count> {
    const foundCarts = await this.usersRepository.carts(id).find();
    return { count: foundCarts.length };
  }



  @get('/users/{id}/carts/prices', {
    responses: {
      '200': {
        description: 'Array of Cart\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Cart) },
          },
        },
      },
    },
  })
  async Multiple_relation(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cart>,
  ): Promise<Cart[]> {
    return this.usersRepository.carts(id).find({
      include: [{
        relation: 'product',
        scope: {
          include: [{ relation: 'productPrices' }, { relation: 'stocks' }],
        },

      },
      ],
    });
  }


}

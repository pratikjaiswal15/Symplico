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
  Orders,
} from '../models';
import { UsersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class UsersOrdersController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Orders\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Orders) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.usersRepository.orders(id).find(filter);
  }

  @get('/users/{id}/finalorders', {
    responses: {
      '200': {
        description: 'Array of Orders\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Orders, { includeRelations: true }) },
          },
        },
      },
    },
  })
  async final_orders(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    const myFilter = {
      ...filter, include: [{
        relation: 'orderedProducts',
        scope: {
          include: [{
            relation: 'product', scope: {
              fields: { product_id: true, name: true, image_url: true }
            }
          }],
        },
      },
      {
        relation: 'address'
      }],
    };

    return this.usersRepository.orders(id).find(myFilter);

  }

  @post('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Orders) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrdersInUsers',
            exclude: ['order_id'],
            optional: ['user_id']
          }),
        },
      },
    }) orders: Omit<Orders, 'order_id'>,
  ): Promise<Orders> {
    return this.usersRepository.orders(id).create(orders);
  }

  @patch('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'Users.Orders PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, { partial: true }),
        },
      },
    })
    orders: Partial<Orders>,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.usersRepository.orders(id).patch(orders, where);
  }

  @del('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'Users.Orders DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.usersRepository.orders(id).delete(where);
  }

  @patch('/users/{id}/orders/{order_id}', {
    responses: {
      '200': {
        description: 'Users.orders PATCH success',
      },
    },
  })
  async patch_id(
    @param.path.number('id') id: number,
    @param.path.string('order_id') order_id: string,

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, { partial: true }),
        },
      },
    })
    cart: Partial<Orders>,
    //  @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<any> {
    return this.usersRepository.orders(id).patch(cart, { cart_id: order_id });
  }


  @get('/users/{id}/orders/{order_id}', {
    responses: {
      '200': {
        description: 'Array of Order\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Orders) },
          },
        },
      },
    },
  })
  async find_id(
    @param.path.number('id') id: number,
    @param.path.string('order_id') order_id: string,


  ): Promise<Orders[]> {
    return this.usersRepository.orders(id).find({ where: { cart_id: order_id } });
  }


}

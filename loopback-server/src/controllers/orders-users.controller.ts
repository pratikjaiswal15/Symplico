import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Orders,
  Users,
} from '../models';
import { OrdersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class OrdersUsersController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }


  @get('/orders/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Orders',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Users) },
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Orders.prototype.order_id,
  ): Promise<Users> {
    return this.ordersRepository.users(id);
  }
}

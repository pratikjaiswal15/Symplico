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
  Address,
} from '../models';
import { OrdersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class OrdersAddressController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/address', {
    responses: {
      '200': {
        description: 'Address belonging to Orders',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Address) },
          },
        },
      },
    },
  })
  async getAddress(
    @param.path.string('id') id: typeof Orders.prototype.order_id,
  ): Promise<Address> {
    return this.ordersRepository.address(id);
  }
}

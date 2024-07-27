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
  Orders,
} from '../models';
import { OrderedProductsRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class OrderedProductsOrdersController {
  constructor(
    @repository(OrderedProductsRepository)
    public orderedProductsRepository: OrderedProductsRepository,
  ) { }

  @get('/ordered-products/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to OrderedProducts',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Orders) },
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof OrderedProducts.prototype.op_id,
  ): Promise<Orders> {
    return this.orderedProductsRepository.orders(id);
  }
}
